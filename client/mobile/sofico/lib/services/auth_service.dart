import 'package:dio/dio.dart';
import 'api_service.dart';
import 'api_config.dart';

class AuthService {
  final ApiService _api;

  AuthService(this._api);

  // User Registration
  Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String password,
    required String phone,
    String? role,
  }) async {
    final response = await _api.post('/auth/register', data: {
      'name': name,
      'email': email,
      'password': password,
      'phone': phone,
      if (role != null) 'role': role,
    });
    return response.data;
  }

  // User Login
  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    final response = await _api.post('/auth/login', data: {
      'email': email,
      'password': password,
    });
    
    // Save tokens
    await _api.saveTokens(
      response.data['accessToken'],
      response.data['refreshToken'],
    );
    
    return response.data;
  }

  // Refresh Token
  Future<Map<String, dynamic>> refreshToken() async {
    final response = await _api.post('/auth/refresh-token');
    await _api.saveTokens(
      response.data['accessToken'],
      response.data['refreshToken'],
    );
    return response.data;
  }

  // Get User Profile
  Future<Map<String, dynamic>> getProfile() async {
    final response = await _api.get('/auth/profile');
    return response.data;
  }

  // Update User Profile
  Future<Map<String, dynamic>> updateProfile({
    String? name,
    String? email,
    String? phone,
    String? avatar,
  }) async {
    final response = await _api.put('/auth/profile', data: {
      if (name != null) 'name': name,
      if (email != null) 'email': email,
      if (phone != null) 'phone': phone,
      if (avatar != null) 'avatar': avatar,
    });
    return response.data;
  }

  // Get All Users (Admin only)
  Future<List<Map<String, dynamic>>> getAllUsers() async {
    final response = await _api.get('/auth/users');
    return List<Map<String, dynamic>>.from(response.data);
  }

  // Update User Role (Admin only)
  Future<Map<String, dynamic>> updateUserRole({
    required String userId,
    required String role,
  }) async {
    final response = await _api.put('/auth/users/$userId/role', data: {
      'role': role,
    });
    return response.data;
  }

  // Logout
  Future<void> logout() async {
    await _api.clearTokens();
  }

  // Check if user is authenticated
  Future<bool> isAuthenticated() async {
    try {
      await getProfile();
      return true;
    } catch (e) {
      return false;
    }
  }
} 