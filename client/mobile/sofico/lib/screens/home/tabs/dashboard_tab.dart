import 'package:flutter/material.dart';
import '../../../constants/colors.dart';
import '../../../constants/text_styles.dart';

class ActivityItem {
  final String id;
  final String title;
  final String description;
  final String amount;
  final String date;
  final String type;
  final String status;

  const ActivityItem({
    required this.id,
    required this.title,
    required this.description,
    required this.amount,
    required this.date,
    required this.type,
    required this.status,
  });

  bool get isCredit => type == 'CREDIT';
  bool get isPending => status == 'PENDING';
}

class DashboardTab extends StatelessWidget {
  const DashboardTab({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(context),
            _buildBalanceCard(),
            _buildQuickActions(context),
            _buildActivityList(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 48, 16, 16),
      decoration: BoxDecoration(
        color: AppColors.primary,
        borderRadius: const BorderRadius.vertical(bottom: Radius.circular(24)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Welcome back,',
                    style: AppTextStyles.body.copyWith(color: Colors.white70),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'John Doe',
                    style: AppTextStyles.heading2.copyWith(color: Colors.white),
                  ),
                ],
              ),
              CircleAvatar(
                radius: 24,
                backgroundColor: Colors.white,
                child: Text(
                  'JD',
                  style: AppTextStyles.heading3.copyWith(color: AppColors.primary),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBalanceCard() {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppColors.primary,
            AppColors.primary.withAlpha(204),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withAlpha(77),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Total Balance',
            style: AppTextStyles.body.copyWith(color: Colors.white70),
          ),
          const SizedBox(height: 8),
          Text(
            '₹1,25,000',
            style: AppTextStyles.heading1.copyWith(color: Colors.white),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildBalanceInfo('Income', '₹45,000', true),
              _buildBalanceInfo('Expenses', '₹20,000', false),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBalanceInfo(String label, String amount, bool isIncome) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: AppTextStyles.caption.copyWith(color: Colors.white70),
        ),
        const SizedBox(height: 4),
        Text(
          amount,
          style: AppTextStyles.heading3.copyWith(
            color: isIncome ? Colors.green[100] : Colors.red[100],
          ),
        ),
      ],
    );
  }

  Widget _buildQuickActions(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Quick Actions',
            style: AppTextStyles.heading3,
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildActionButton(
                context,
                Icons.account_balance,
                'Loans',
                () {
                  // TODO: Navigate to loans
                },
              ),
              _buildActionButton(
                context,
                Icons.savings,
                'Savings',
                () {
                  // TODO: Navigate to savings
                },
              ),
              _buildActionButton(
                context,
                Icons.payments,
                'Pay',
                () {
                  // TODO: Navigate to payments
                },
              ),
              _buildActionButton(
                context,
                Icons.history,
                'History',
                () {
                  // TODO: Navigate to history
                },
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildActionButton(
    BuildContext context,
    IconData icon,
    String label,
    VoidCallback onPressed,
  ) {
    return Column(
      children: [
        Container(
          width: 56,
          height: 56,
          decoration: BoxDecoration(
            color: AppColors.primary.withAlpha(25),
            borderRadius: BorderRadius.circular(16),
          ),
          child: IconButton(
            icon: Icon(icon, color: AppColors.primary),
            onPressed: onPressed,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          label,
          style: AppTextStyles.caption,
        ),
      ],
    );
  }

  Widget _buildActivityList() {
    final activities = [
      const ActivityItem(
        id: '1',
        title: 'Salary Credit',
        description: 'Monthly salary from Company Ltd.',
        amount: '+₹45,000',
        date: '2024-03-15',
        type: 'CREDIT',
        status: 'COMPLETED',
      ),
      const ActivityItem(
        id: '2',
        title: 'Loan Payment',
        description: 'Monthly EMI payment',
        amount: '-₹5,000',
        date: '2024-03-14',
        type: 'DEBIT',
        status: 'COMPLETED',
      ),
      const ActivityItem(
        id: '3',
        title: 'Transfer to John',
        description: 'Shared expenses',
        amount: '-₹2,500',
        date: '2024-03-13',
        type: 'DEBIT',
        status: 'PENDING',
      ),
    ];

    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Recent Activity',
                style: AppTextStyles.heading3,
              ),
              TextButton(
                onPressed: () {
                  // TODO: View all activity
                },
                child: const Text('View All'),
              ),
            ],
          ),
          const SizedBox(height: 16),
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: activities.length,
            itemBuilder: (context, index) {
              final activity = activities[index];
              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.border),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 10,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    Container(
                      width: 48,
                      height: 48,
                      decoration: BoxDecoration(
                        color: AppColors.primary.withAlpha(25),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Icon(
                        activity.isCredit ? Icons.arrow_downward : Icons.arrow_upward,
                        color: activity.isCredit ? Colors.green : Colors.red,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            activity.title,
                            style: AppTextStyles.body.copyWith(
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            activity.description,
                            style: AppTextStyles.caption.copyWith(
                              color: Colors.grey[600],
                            ),
                          ),
                          if (activity.isPending) ...[
                            const SizedBox(height: 4),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 2,
                              ),
                              decoration: BoxDecoration(
                                color: AppColors.success.withAlpha(25),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                'Pending',
                                style: AppTextStyles.caption.copyWith(
                                  color: Colors.orange,
                                ),
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          activity.amount,
                          style: AppTextStyles.body.copyWith(
                            color: activity.isCredit ? Colors.green : Colors.red,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          activity.date,
                          style: AppTextStyles.caption.copyWith(
                            color: Colors.grey[600],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }
} 