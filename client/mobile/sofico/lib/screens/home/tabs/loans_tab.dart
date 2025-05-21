import 'package:flutter/material.dart';
import '../../../constants/colors.dart';
import '../../../constants/text_styles.dart';
import '../../../widgets/custom_button.dart';

class Loan {
  final String id;
  final String amount;
  final String status;
  final String type;
  final String date;
  final String nextPayment;
  final String dueDate;

  const Loan({
    required this.id,
    required this.amount,
    required this.status,
    required this.type,
    required this.date,
    required this.nextPayment,
    required this.dueDate,
  });

  bool get isActive => status == 'ACTIVE';
}

class LoansTab extends StatefulWidget {
  const LoansTab({Key? key}) : super(key: key);

  @override
  State<LoansTab> createState() => _LoansTabState();
}

class _LoansTabState extends State<LoansTab> {
  bool _showApplicationForm = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Loans'),
        actions: [
          IconButton(
            icon: Icon(_showApplicationForm ? Icons.list : Icons.add),
            onPressed: () {
              setState(() {
                _showApplicationForm = !_showApplicationForm;
              });
            },
          ),
        ],
      ),
      body: _showApplicationForm ? _buildApplicationForm() : _buildLoanList(),
    );
  }

  Widget _buildLoanList() {
    final loans = [
      const Loan(
        id: '1',
        amount: '₹50,000',
        status: 'ACTIVE',
        type: 'Personal Loan',
        date: '2024-03-15',
        nextPayment: '₹5,000',
        dueDate: '2024-04-15',
      ),
      const Loan(
        id: '2',
        amount: '₹25,000',
        status: 'PENDING',
        type: 'Business Loan',
        date: '2024-03-20',
        nextPayment: 'N/A',
        dueDate: 'N/A',
      ),
    ];

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: loans.length,
      itemBuilder: (context, index) {
        final loan = loans[index];
        
        return Container(
          margin: const EdgeInsets.only(bottom: 16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: AppColors.border),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withAlpha(13),
                blurRadius: 10,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            children: [
              // Header
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: loan.isActive ? AppColors.primary.withAlpha(25) : AppColors.accent.withAlpha(25),
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      loan.type,
                      style: AppTextStyles.heading3.copyWith(
                        color: loan.isActive ? AppColors.primary : AppColors.accent,
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                      decoration: BoxDecoration(
                        color: loan.isActive ? AppColors.primary.withAlpha(25) : AppColors.accent.withAlpha(25),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        loan.status,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              // Details
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    _buildDetailRow('Amount', loan.amount),
                    const SizedBox(height: 8),
                    _buildDetailRow('Date', loan.date),
                    if (loan.isActive) ...[
                      const SizedBox(height: 8),
                      _buildDetailRow('Next Payment', loan.nextPayment),
                      const SizedBox(height: 8),
                      _buildDetailRow('Due Date', loan.dueDate),
                    ],
                  ],
                ),
              ),

              // Actions
              if (loan.isActive)
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: const BoxDecoration(
                    border: Border(
                      top: BorderSide(color: AppColors.border),
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      TextButton.icon(
                        onPressed: () {
                          // TODO: View loan details
                        },
                        icon: const Icon(Icons.visibility, size: 20),
                        label: const Text('View Details'),
                      ),
                      TextButton.icon(
                        onPressed: () {
                          // TODO: Make payment
                        },
                        icon: const Icon(Icons.payments, size: 20),
                        label: const Text('Make Payment'),
                      ),
                    ],
                  ),
                ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: AppTextStyles.bodyLight,
        ),
        Text(
          value,
          style: const TextStyle(
            fontWeight: FontWeight.w600,
            fontSize: 16,
          ),
        ),
      ],
    );
  }

  Widget _buildApplicationForm() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Apply for a Loan',
            style: AppTextStyles.heading2,
          ),
          const SizedBox(height: 8),
          const Text(
            'Fill in the details below to apply for a loan',
            style: AppTextStyles.bodyLight,
          ),
          const SizedBox(height: 24),

          // Loan type
          const Text(
            'Loan Type',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          DropdownButtonFormField<String>(
            decoration: InputDecoration(
              hintText: 'Select loan type',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            items: const [
              DropdownMenuItem(
                value: 'personal',
                child: Text('Personal Loan'),
              ),
              DropdownMenuItem(
                value: 'business',
                child: Text('Business Loan'),
              ),
              DropdownMenuItem(
                value: 'education',
                child: Text('Education Loan'),
              ),
            ],
            onChanged: (value) {
              // TODO: Handle loan type selection
            },
          ),

          const SizedBox(height: 24),

          // Amount
          const Text(
            'Loan Amount',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          TextFormField(
            decoration: InputDecoration(
              hintText: 'Enter amount',
              prefixText: '₹ ',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            keyboardType: TextInputType.number,
          ),

          const SizedBox(height: 24),

          // Purpose
          const Text(
            'Purpose',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          TextFormField(
            decoration: InputDecoration(
              hintText: 'Describe the purpose of your loan',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            maxLines: 3,
          ),

          const SizedBox(height: 32),

          // Submit button
          CustomButton(
            text: 'Submit Application',
            onPressed: () {
              // TODO: Handle loan application submission
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Application submitted successfully')),
              );
              setState(() {
                _showApplicationForm = false;
              });
            },
          ),
        ],
      ),
    );
  }
} 