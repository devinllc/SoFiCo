import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'api_config.dart';

class ApiService {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal(); 

  final _client = http.Client();
  String? _accessToken;
  String? _refreshToken;

  // Initialize tokens from storage
  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _accessToken = prefs.getString('accessToken');
    _refreshToken = prefs.getString('refreshToken');
  }

  // Save tokens to storage
  Future<void> _saveTokens(String accessToken, String refreshToken) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('accessToken', accessToken);
    await prefs.setString('refreshToken', refreshToken);
    _accessToken = accessToken;
    _refreshToken = refreshToken;
  }

  // Clear tokens
  Future<void> clearTokens() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('accessToken');
    await prefs.remove('refreshToken');
    _accessToken = null;
    _refreshToken = null;
  }

  // Get headers with auth token
  Map<String, String> _getHeaders({bool includeAuth = true}) {
    final headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (includeAuth && _accessToken != null) {
      headers['Authorization'] = 'Bearer $_accessToken';
    }

    return headers;
  }

  // Handle response
  dynamic _handleResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return json.decode(response.body);
    } else if (response.statusCode == 401) {
      // Token expired, try to refresh
      return _refreshTokenAndRetry(response.request!);
    } else {
      throw Exception('API Error: ${response.statusCode} - ${response.body}');
    }
  }

  // Refresh token and retry request
  Future<dynamic> _refreshTokenAndRetry(http.BaseRequest request) async {
    if (_refreshToken == null) {
      throw Exception('No refresh token available');
    }

    try {
      final response = await _client.post(
        Uri.parse('${ApiConfig.baseUrl}${ApiConfig.refreshToken}'),
        headers: _getHeaders(includeAuth: false),
        body: json.encode({'refreshToken': _refreshToken}),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        await _saveTokens(data['accessToken'], data['refreshToken']);
        
        // Retry original request with new token
        final retryRequest = http.Request(request.method, request.url)
          ..headers.addAll(_getHeaders())
          ..body = request is http.Request ? request.body : '';
        
        final retryResponse = await _client.send(retryRequest);
        final retryBody = await retryResponse.stream.bytesToString();
        return json.decode(retryBody);
      } else {
        await clearTokens();
        throw Exception('Failed to refresh token');
      }
    } catch (e) {
      await clearTokens();
      throw Exception('Token refresh failed: $e');
    }
  }

  // Getters for tokens
  String? get accessToken => _accessToken;
  String? get refreshToken => _refreshToken;

  // Save tokens to storage (public method)
  Future<void> saveTokens(String accessToken, String refreshToken) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('accessToken', accessToken);
    await prefs.setString('refreshToken', refreshToken);
    _accessToken = accessToken;
    _refreshToken = refreshToken;
  }

  // HTTP Methods
  Future<dynamic> get(String endpoint) async {
    final response = await _client.get(
      Uri.parse('${ApiConfig.baseUrl}$endpoint'),
      headers: _getHeaders(),
    );
    return _handleResponse(response);
  }

  Future<dynamic> post(String endpoint, {Map<String, dynamic>? body}) async {
    final response = await _client.post(
      Uri.parse('${ApiConfig.baseUrl}$endpoint'),
      headers: _getHeaders(),
      body: body != null ? json.encode(body) : null,
    );
    return _handleResponse(response);
  }

  Future<dynamic> put(String endpoint, {Map<String, dynamic>? body}) async {
    final response = await _client.put(
      Uri.parse('${ApiConfig.baseUrl}$endpoint'),
      headers: _getHeaders(),
      body: body != null ? json.encode(body) : null,
    );
    return _handleResponse(response);
  }

  Future<dynamic> delete(String endpoint) async {
    final response = await _client.delete(
      Uri.parse('${ApiConfig.baseUrl}$endpoint'),
      headers: _getHeaders(),
    );
    return _handleResponse(response);
  }
} 