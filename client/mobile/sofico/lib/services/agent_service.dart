import 'package:dio/dio.dart';
import 'api_service.dart';

class AgentService {
  final ApiService _api;

  AgentService(this._api);

  // Register new agent (admin only)
  Future<Map<String, dynamic>> registerAgent({
    required String firstName,
    required String lastName,
    required String email,
    required String phone,
    required String password,
  }) async {
    final response = await _api.post('/agent/register', data: {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'phone': phone,
      'password': password,
    });
    return response.data;
  }

  // Get agent profile (agent only)
  Future<Map<String, dynamic>> getAgentProfile() async {
    final response = await _api.get('/agent/profile');
    return response.data;
  }

  // Get assigned loans (agent only)
  Future<List<Map<String, dynamic>>> getAssignedLoans() async {
    final response = await _api.get('/agent/loans');
    return List<Map<String, dynamic>>.from(response.data['loans']);
  }

  // Get created users (agent only)
  Future<List<Map<String, dynamic>>> getCreatedUsers() async {
    final response = await _api.get('/agent/users');
    return List<Map<String, dynamic>>.from(response.data['users']);
  }

  // Create new user (agent only)
  Future<Map<String, dynamic>> createUser({
    required String firstName,
    required String lastName,
    required String email,
    required String phone,
    required String password,
  }) async {
    final response = await _api.post('/agent/users', data: {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'phone': phone,
      'password': password,
    });
    return response.data;
  }

  // Update performance score (admin only)
  Future<void> updatePerformanceScore({
    required String agentId,
    required double score,
    String? notes,
  }) async {
    await _api.post('/agent/$agentId/performance', data: {
      'score': score,
      if (notes != null) 'notes': notes,
    });
  }
} 