class ApiConfig {
  static const String baseUrl = 'https://so-fi-co.vercel.app';
  
  // Auth endpoints
  static const String login = '/auth/login';
  static const String register = '/auth/register';
  static const String refreshToken = '/auth/refresh-token';
  static const String profile = '/auth/profile';
  
  // Agent endpoints
  static const String agentRegister = '/agent/register';
  static const String agentProfile = '/agent/profile';
  static const String agentLoans = '/agent/loans';
  static const String agentUsers = '/agent/users';
  static const String assignLoan = '/agent/loans'; // POST with loanId
  static const String updatePerformance = '/agent'; // POST with agentId/performance
  
  // Loan endpoints
  static const String applyLoan = '/loan/apply';
  static const String myLoans = '/loan/my-loans';
  static const String loanDetails = '/loan'; // GET with loanId
  static const String allLoans = '/loan';
  static const String approveLoan = '/loan'; // POST with loanId/approve
  static const String rejectLoan = '/loan'; // POST with loanId/reject
  static const String updateLoanStatus = '/loan'; // PUT with loanId/status
  
  // Scheme endpoints
  static const String createScheme = '/scheme';
  static const String mySchemes = '/scheme/my-schemes';
  static const String schemeDetails = '/scheme'; // GET with schemeId
  static const String joinScheme = '/scheme'; // POST with schemeId/join
  static const String dissolveScheme = '/scheme'; // POST with schemeId/dissolve
  static const String addMember = '/scheme'; // POST with schemeId/members
  static const String updateProgress = '/scheme'; // PUT with schemeId/progress
  static const String allSchemes = '/scheme';
  static const String approveScheme = '/scheme'; // POST with schemeId/approve
} 