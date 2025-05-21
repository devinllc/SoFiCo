import 'package:dio/dio.dart';
import 'api_service.dart';

class LoanService {
  final ApiService _api;

  LoanService(this._api);

  // Apply for loan
  Future<Map<String, dynamic>> applyForLoan({
    required double amount,
    required String purpose,
    required int tenure,
    required Map<String, dynamic> documents,
    String? schemeId,
  }) async {
    final response = await _api.post('/loan/apply', data: {
      'amount': amount,
      'purpose': purpose,
      'tenure': tenure,
      'documents': documents,
      if (schemeId != null) 'schemeId': schemeId,
    });
    return response.data;
  }

  // Get user's loans
  Future<List<Map<String, dynamic>>> getMyLoans() async {
    final response = await _api.get('/loan/my-loans');
    return List<Map<String, dynamic>>.from(response.data);
  }

  // Get loan details
  Future<Map<String, dynamic>> getLoanDetails(String loanId) async {
    final response = await _api.get('/loan/$loanId');
    return response.data;
  }

  // Get all loans (admin/agent only)
  Future<List<Map<String, dynamic>>> getAllLoans({
    String? status,
    String? agentId,
    DateTime? startDate,
    DateTime? endDate,
  }) async {
    final queryParams = {
      if (status != null) 'status': status,
      if (agentId != null) 'agentId': agentId,
      if (startDate != null) 'startDate': startDate.toIso8601String(),
      if (endDate != null) 'endDate': endDate.toIso8601String(),
    };
    
    final response = await _api.get('/loan', queryParameters: queryParams);
    return List<Map<String, dynamic>>.from(response.data);
  }

  // Approve loan (admin/agent only)
  Future<Map<String, dynamic>> approveLoan({
    required String loanId,
    String? comments,
    Map<String, dynamic>? terms,
  }) async {
    final response = await _api.post('/loan/$loanId/approve', data: {
      if (comments != null) 'comments': comments,
      if (terms != null) 'terms': terms,
    });
    return response.data;
  }

  // Reject loan (admin/agent only)
  Future<Map<String, dynamic>> rejectLoan({
    required String loanId,
    required String reason,
  }) async {
    final response = await _api.post('/loan/$loanId/reject', data: {
      'reason': reason,
    });
    return response.data;
  }

  // Update loan status (admin/agent only)
  Future<Map<String, dynamic>> updateLoanStatus({
    required String loanId,
    required String status,
    String? comments,
  }) async {
    final response = await _api.put('/loan/$loanId/status', data: {
      'status': status,
      if (comments != null) 'comments': comments,
    });
    return response.data;
  }
} 