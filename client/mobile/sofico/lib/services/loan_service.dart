import 'package:dio/dio.dart';
import 'api_service.dart';

class LoanService {
  final ApiService _api;

  LoanService(this._api);

  // Apply for loan
  Future<Map<String, dynamic>> applyForLoan({
    required double amount,
    required String purpose,
    required int duration,
    String? collateral,
  }) async {
    final response = await _api.post('/loan/apply', data: {
      'amount': amount,
      'purpose': purpose,
      'duration': duration,
      if (collateral != null) 'collateral': collateral,
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
  Future<List<Map<String, dynamic>>> getAllLoans() async {
    final response = await _api.get('/loan');
    return List<Map<String, dynamic>>.from(response.data['loans']);
  }

  // Approve loan (admin/agent only)
  Future<void> approveLoan({
    required String loanId,
    required bool approved,
    String? notes,
  }) async {
    await _api.post('/loan/$loanId/approve', data: {
      'approved': approved,
      if (notes != null) 'notes': notes,
    });
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
  Future<void> updateLoanStatus({
    required String loanId,
    required String status,
    String? notes,
  }) async {
    await _api.put('/loan/$loanId/status', data: {
      'status': status,
      if (notes != null) 'notes': notes,
    });
  }
} 