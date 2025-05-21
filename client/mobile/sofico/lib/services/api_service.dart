import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiService {
  static const String baseUrl = 'https://so-fi-co.vercel.app';
  static const String _tokenKey = 'access_token';
  static const String _refreshTokenKey = 'refresh_token';
  
  late final Dio _dio;
  final _storage = const FlutterSecureStorage();
  
  ApiService() {
    _dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ));

    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await _storage.read(key: _tokenKey);
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (DioException error, handler) async {
        if (error.response?.statusCode == 401) {
          // Token expired, try to refresh
          final refreshToken = await _storage.read(key: _refreshTokenKey);
          if (refreshToken != null) {
            try {
              final response = await _dio.post('/auth/refresh-token', 
                data: {'refreshToken': refreshToken});
              
              if (response.statusCode == 200) {
                final newToken = response.data['accessToken'];
                await _storage.write(key: _tokenKey, value: newToken);
                
                // Retry the original request
                error.requestOptions.headers['Authorization'] = 'Bearer $newToken';
                final retryResponse = await _dio.fetch(error.requestOptions);
                return handler.resolve(retryResponse);
              }
            } catch (e) {
              // Refresh token failed, clear tokens and redirect to login
              await _storage.deleteAll();
              // TODO: Implement navigation to login screen
            }
          }
        }
        return handler.next(error);
      },
    ));
  }

  // Common HTTP methods
  Future<Response> get(String path, {Map<String, dynamic>? queryParameters}) async {
    try {
      return await _dio.get(path, queryParameters: queryParameters);
    } catch (e) {
      rethrow;
    }
  }

  Future<Response> post(String path, {dynamic data}) async {
    try {
      return await _dio.post(path, data: data);
    } catch (e) {
      rethrow;
    }
  }

  Future<Response> put(String path, {dynamic data}) async {
    try {
      return await _dio.put(path, data: data);
    } catch (e) {
      rethrow;
    }
  }

  Future<Response> delete(String path) async {
    try {
      return await _dio.delete(path);
    } catch (e) {
      rethrow;
    }
  }

  // Token management
  Future<void> saveTokens(String accessToken, String refreshToken) async {
    await _storage.write(key: _tokenKey, value: accessToken);
    await _storage.write(key: _refreshTokenKey, value: refreshToken);
  }

  Future<void> clearTokens() async {
    await _storage.deleteAll();
  }
} 