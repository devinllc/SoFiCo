import 'package:dio/dio.dart';
import 'api_service.dart';

class AgentService {
  final ApiService _api;

  AgentService(this._api);

  // Register new agent (admin only)
  Future<Map<String, dynamic>> registerAgent({
    required String name,
    required String email,
    required String password,
    required String phone,
    required String address,
    String? commissionRate,
  }) async {
    final response = await _api.post('/agent/register', data: {
      'name': name,
      'email': email,
      'password': password,
      'phone': phone,
      'address': address,
      if (commissionRate != null) 'commissionRate': commissionRate,
    });
    return response.data;
  }

  // Update agent performance (admin only)
  Future<Map<String, dynamic>> updateAgentPerformance({
    required String agentId,
    required Map<String, dynamic> performance,
  }) async {
    final response = await _api.post('/agent/$agentId/performance', data: performance);
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
    return List<Map<String, dynamic>>.from(response.data);
  }

  // Assign loan to agent (agent only)
  Future<Map<String, dynamic>> assignLoan({
    required String loanId,
    required String agentId,
  }) async {
    final response = await _api.post('/agent/loans/$loanId/assign', data: {
      'agentId': agentId,
    });
    return response.data;
  }

  // Get created users (agent only)
  Future<List<Map<String, dynamic>>> getCreatedUsers() async {
    final response = await _api.get('/agent/users');
    return List<Map<String, dynamic>>.from(response.data);
  }

  // Create new user (agent only)
  Future<Map<String, dynamic>> createUser({
    required String name,
    required String email,
    required String password,
    required String phone,
    String? role,
  }) async {
    final response = await _api.post('/agent/users', data: {
      'name': name,
      'email': email,
      'password': password,
      'phone': phone,
      if (role != null) 'role': role,
    });
    return response.data;
  }
} 