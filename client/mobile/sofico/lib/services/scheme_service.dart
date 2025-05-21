import 'package:dio/dio.dart';
import 'api_service.dart';

class SchemeService {
  final ApiService _api;

  SchemeService(this._api);

  // Create new scheme
  Future<Map<String, dynamic>> createScheme({
    required String name,
    required String description,
    required double targetAmount,
    required int duration,
    required List<String> members,
    Map<String, dynamic>? rules,
  }) async {
    final response = await _api.post('/scheme', data: {
      'name': name,
      'description': description,
      'targetAmount': targetAmount,
      'duration': duration,
      'members': members,
      if (rules != null) 'rules': rules,
    });
    return response.data;
  }

  // Get user's schemes
  Future<List<Map<String, dynamic>>> getMySchemes() async {
    final response = await _api.get('/scheme/my-schemes');
    return List<Map<String, dynamic>>.from(response.data);
  }

  // Get scheme details
  Future<Map<String, dynamic>> getSchemeDetails(String schemeId) async {
    final response = await _api.get('/scheme/$schemeId');
    return response.data;
  }

  // Join scheme
  Future<Map<String, dynamic>> joinScheme({
    required String schemeId,
    double? contribution,
  }) async {
    final response = await _api.post('/scheme/$schemeId/join', data: {
      if (contribution != null) 'contribution': contribution,
    });
    return response.data;
  }

  // Dissolve scheme
  Future<Map<String, dynamic>> dissolveScheme({
    required String schemeId,
    required String reason,
  }) async {
    final response = await _api.post('/scheme/$schemeId/dissolve', data: {
      'reason': reason,
    });
    return response.data;
  }

  // Add member to scheme
  Future<Map<String, dynamic>> addSchemeMember({
    required String schemeId,
    required String userId,
    String? role,
  }) async {
    final response = await _api.post('/scheme/$schemeId/members', data: {
      'userId': userId,
      if (role != null) 'role': role,
    });
    return response.data;
  }

  // Update scheme progress
  Future<Map<String, dynamic>> updateSchemeProgress({
    required String schemeId,
    required double progress,
    String? comments,
  }) async {
    final response = await _api.put('/scheme/$schemeId/progress', data: {
      'progress': progress,
      if (comments != null) 'comments': comments,
    });
    return response.data;
  }

  // Get all schemes (admin only)
  Future<List<Map<String, dynamic>>> getAllSchemes({
    String? status,
    DateTime? startDate,
    DateTime? endDate,
  }) async {
    final queryParams = {
      if (status != null) 'status': status,
      if (startDate != null) 'startDate': startDate.toIso8601String(),
      if (endDate != null) 'endDate': endDate.toIso8601String(),
    };
    
    final response = await _api.get('/scheme', queryParameters: queryParams);
    return List<Map<String, dynamic>>.from(response.data);
  }

  // Approve scheme (admin only)
  Future<Map<String, dynamic>> approveScheme({
    required String schemeId,
    String? comments,
    Map<String, dynamic>? terms,
  }) async {
    final response = await _api.post('/scheme/$schemeId/approve', data: {
      if (comments != null) 'comments': comments,
      if (terms != null) 'terms': terms,
    });
    return response.data;
  }
} 