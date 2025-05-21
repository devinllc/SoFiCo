import 'api_service.dart';
import 'api_config.dart';

class AuthService {
  final ApiService _api = ApiService();

  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await _api.post(
        ApiConfig.login,
        body: {
          'email': email,
          'password': password,
        },
      );

      // Save tokens
      await _api.saveTokens(
        response['accessToken'],
        response['refreshToken'],
      );

      return response;
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }

  Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String password,
  }) async {
    try {
      final response = await _api.post(
        ApiConfig.register,
        body: {
          'name': name,
          'email': email,
          'password': password,
        },
      );

      // Save tokens
      await _api.saveTokens(
        response['accessToken'],
        response['refreshToken'],
      );

      return response;
    } catch (e) {
      throw Exception('Registration failed: $e');
    }
  }

  Future<Map<String, dynamic>> getProfile() async {
    try {
      return await _api.get(ApiConfig.profile);
    } catch (e) {
      throw Exception('Failed to get profile: $e');
    }
  }

  Future<void> logout() async {
    await _api.clearTokens();
  }

  Future<bool> isAuthenticated() async {
    await _api.init();
    return _api.accessToken != null;
  }
} 