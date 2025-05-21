import 'package:dio/dio.dart';
import 'api_service.dart';

class AuthService {
  final ApiService _api;
  Map<String, dynamic>? _currentUser;

  AuthService(this._api);

  // Get current user data
  Map<String, dynamic>? get currentUser => _currentUser;

  // User Registration
  Future<Map<String, dynamic>> register({
    required String firstName,
    required String lastName,
    required String email,
    required String phone,
    required String password,
    String? role,
  }) async {
    try {
      print('Making registration request to /auth/register');
      final response = await _api.post('/auth/register', data: {
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phone': phone,
        'password': password,
        if (role != null) 'role': role,
      });

      print('Registration response: ${response.data}');
      final data = response.data as Map<String, dynamic>;
      
      // Save tokens and user data
      if (data.containsKey('accessToken') && data.containsKey('refreshToken') && data.containsKey('user')) {
        print('Saving tokens and user data...');
        await _api.saveTokens(
          data['accessToken'] as String,
          data['refreshToken'] as String,
        );
        _currentUser = data['user'] as Map<String, dynamic>;
        print('User data saved: $_currentUser');
      } else {
        print('Missing required data in response. Available keys: ${data.keys.toList()}');
        throw Exception('Invalid response format: Missing required fields');
      }
      
      return data;
    } catch (e, stackTrace) {
      print('Registration error in AuthService: $e');
      print('Stack trace: $stackTrace');
      rethrow;
    }
  }

  // User Login
  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    try {
      print('Making login request to /auth/login');
      final response = await _api.post('/auth/login', data: {
        'email': email,
        'password': password,
      });
      
      print('Login response: ${response.data}');
      final data = response.data as Map<String, dynamic>;
      
      // Save tokens and user data
      if (data.containsKey('accessToken') && data.containsKey('refreshToken') && data.containsKey('user')) {
        print('Saving tokens and user data...');
        await _api.saveTokens(
          data['accessToken'] as String,
          data['refreshToken'] as String,
        );
        _currentUser = data['user'] as Map<String, dynamic>;
        print('User data saved: $_currentUser');
        
        // Try to fetch complete profile data, but don't block login if it fails
        try {
          print('Fetching complete profile data...');
          final profileData = await getProfile();
          if (profileData != null) {
            print('Profile data fetched successfully: $_currentUser');
          } else {
            print('Profile fetch returned null, using basic user data');
          }
        } catch (e) {
          print('Error fetching profile data: $e');
          // Continue with basic user data from login response
          print('Continuing with basic user data from login response');
        }
      } else {
        print('Missing required data in response. Available keys: ${data.keys.toList()}');
        throw Exception('Invalid response format: Missing required fields');
      }
      
      return data;
    } catch (e, stackTrace) {
      print('Login error in AuthService: $e');
      print('Stack trace: $stackTrace');
      rethrow;
    }
  }

  // Get User Profile
  Future<Map<String, dynamic>?> getProfile() async {
    try {
      print('Fetching profile from /auth/profile');
      final response = await _api.get('/auth/profile');
      print('Profile response: ${response.data}');
      
      if (response.data != null) {
        _currentUser = response.data as Map<String, dynamic>;
        print('Profile data updated: $_currentUser');
        return _currentUser;
      } else {
        print('Profile data is null');
        return null;
      }
    } catch (e) {
      print('Error fetching profile: $e');
      return null; // Return null instead of throwing to allow login to continue
    }
  }

  // Refresh Token
  Future<Map<String, dynamic>> refreshToken(String refreshToken) async {
    try {
      final response = await _api.post('/auth/refresh-token', data: {
        'refreshToken': refreshToken,
      });
      
      final data = response.data as Map<String, dynamic>;
      
      if (data.containsKey('accessToken') && data.containsKey('refreshToken')) {
        await _api.saveTokens(
          data['accessToken'] as String,
          data['refreshToken'] as String,
        );
      }
      
      return data;
    } catch (e) {
      print('Error refreshing token: $e');
      rethrow;
    }
  }

  // Disable Account
  Future<void> disableAccount() async {
    try {
      await _api.post('/auth/disable');
      await logout();
    } catch (e) {
      print('Error disabling account: $e');
      rethrow;
    }
  }

  // Get All Users (Admin only)
  Future<List<Map<String, dynamic>>> getAllUsers() async {
    final response = await _api.get('/auth/users');
    return List<Map<String, dynamic>>.from(response.data['users']);
  }

  // Logout
  Future<void> logout() async {
    try {
      await _api.clearTokens();
      _currentUser = null;
    } catch (e) {
      print('Error during logout: $e');
      rethrow;
    }
  }

  // Check if user is authenticated
  Future<bool> isAuthenticated() async {
    try {
      if (_currentUser == null) {
        await getProfile();
      }
      return _currentUser != null;
    } catch (e) {
      return false;
    }
  }
} 