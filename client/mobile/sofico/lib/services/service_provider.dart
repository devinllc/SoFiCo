import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'api_service.dart';
import 'auth_service.dart';
import 'agent_service.dart';
import 'loan_service.dart';
import 'scheme_service.dart';

class ServiceProvider extends ChangeNotifier {
  late final ApiService _apiService;
  late final AuthService _authService;
  late final AgentService _agentService;
  late final LoanService _loanService;
  late final SchemeService _schemeService;

  ServiceProvider() {
    _apiService = ApiService();
    _authService = AuthService(_apiService);
    _agentService = AgentService(_apiService);
    _loanService = LoanService(_apiService);
    _schemeService = SchemeService(_apiService);
  }

  // Getters for services
  ApiService get apiService => _apiService;
  AuthService get authService => _authService;
  AgentService get agentService => _agentService;
  LoanService get loanService => _loanService;
  SchemeService get schemeService => _schemeService;

  // Static method to get the provider instance
  static ServiceProvider of(BuildContext context) {
    return Provider.of<ServiceProvider>(context, listen: false);
  }
} 