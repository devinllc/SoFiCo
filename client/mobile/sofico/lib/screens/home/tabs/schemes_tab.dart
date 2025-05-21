import 'package:flutter/material.dart';
import '../../../constants/colors.dart';
import '../../../constants/text_styles.dart';
import '../../../widgets/custom_button.dart';

class SchemesTab extends StatefulWidget {
  const SchemesTab({Key? key}) : super(key: key);

  @override
  State<SchemesTab> createState() => _SchemesTabState();
}

class _SchemesTabState extends State<SchemesTab> {
  bool _showCreationForm = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Schemes'),
        actions: [
          IconButton(
            icon: Icon(_showCreationForm ? Icons.list : Icons.add),
            onPressed: () {
              setState(() {
                _showCreationForm = !_showCreationForm;
              });
            },
          ),
        ],
      ),
      body: _showCreationForm ? _buildCreationForm() : _buildSchemeList(),
    );
  }

  Widget _buildSchemeList() {
    final schemes = [
      {
        'id': '1',
        'name': 'Dream Home',
        'targetAmount': '₹5,00,000',
        'currentAmount': '₹2,50,000',
        'members': 5,
        'status': 'ACTIVE',
        'progress': 50,
        'duration': '12 months',
      },
      {
        'id': '2',
        'name': 'Vacation Fund',
        'targetAmount': '₹1,00,000',
        'currentAmount': '₹75,000',
        'members': 3,
        'status': 'ACTIVE',
        'progress': 75,
        'duration': '6 months',
      },
      {
        'id': '3',
        'name': 'Education Fund',
        'targetAmount': '₹2,00,000',
        'currentAmount': '₹0',
        'members': 1,
        'status': 'PENDING',
        'progress': 0,
        'duration': '24 months',
      },
    ];

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: schemes.length,
      itemBuilder: (context, index) {
        final scheme = schemes[index];
        final isActive = scheme['status'] == 'ACTIVE';
        
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
                  color: AppColors.primary.withAlpha(25),
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            scheme['name'] as String,
                            style: AppTextStyles.heading3.copyWith(
                              color: isActive ? AppColors.primary : AppColors.accent,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '${scheme['members']} members',
                            style: AppTextStyles.bodyLight.copyWith(
                              color: isActive ? AppColors.primary : AppColors.accent,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.primary.withAlpha(25),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        scheme['status'] as String,
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

              // Progress
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Progress',
                          style: AppTextStyles.bodyLight,
                        ),
                        Text(
                          '${scheme['progress']}%',
                          style: const TextStyle(
                            fontWeight: FontWeight.w600,
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    LinearProgressIndicator(
                      value: (scheme['progress'] as int) / 100,
                      backgroundColor: AppColors.border,
                      valueColor: AlwaysStoppedAnimation<Color>(
                        isActive ? AppColors.primary : AppColors.accent,
                      ),
                    ),
                  ],
                ),
              ),

              // Details
              Container(
                padding: const EdgeInsets.all(16),
                decoration: const BoxDecoration(
                  border: Border(
                    top: BorderSide(color: AppColors.border),
                  ),
                ),
                child: Column(
                  children: [
                    _buildDetailRow('Target Amount', scheme['targetAmount'] as String),
                    const SizedBox(height: 8),
                    _buildDetailRow('Current Amount', scheme['currentAmount'] as String),
                    const SizedBox(height: 8),
                    _buildDetailRow('Duration', scheme['duration'] as String),
                  ],
                ),
              ),

              // Actions
              if (isActive)
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
                          // TODO: View scheme details
                        },
                        icon: const Icon(Icons.visibility, size: 20),
                        label: const Text('View Details'),
                      ),
                      TextButton.icon(
                        onPressed: () {
                          // TODO: Add contribution
                        },
                        icon: const Icon(Icons.add_circle, size: 20),
                        label: const Text('Contribute'),
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

  Widget _buildCreationForm() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Create New Scheme',
            style: AppTextStyles.heading2,
          ),
          const SizedBox(height: 8),
          const Text(
            'Fill in the details to create a new savings scheme',
            style: AppTextStyles.bodyLight,
          ),
          const SizedBox(height: 24),

          // Scheme name
          const Text(
            'Scheme Name',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          TextFormField(
            decoration: InputDecoration(
              hintText: 'Enter scheme name',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          ),

          const SizedBox(height: 24),

          // Target amount
          const Text(
            'Target Amount',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          TextFormField(
            decoration: InputDecoration(
              hintText: 'Enter target amount',
              prefixText: '₹ ',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            keyboardType: TextInputType.number,
          ),

          const SizedBox(height: 24),

          // Duration
          const Text(
            'Duration (months)',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          TextFormField(
            decoration: InputDecoration(
              hintText: 'Enter duration in months',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            keyboardType: TextInputType.number,
          ),

          const SizedBox(height: 24),

          // Description
          const Text(
            'Description',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          TextFormField(
            decoration: InputDecoration(
              hintText: 'Describe the purpose of this scheme',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            maxLines: 3,
          ),

          const SizedBox(height: 32),

          // Submit button
          CustomButton(
            text: 'Create Scheme',
            onPressed: () {
              // TODO: Handle scheme creation
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Scheme created successfully')),
              );
              setState(() {
                _showCreationForm = false;
              });
            },
          ),
        ],
      ),
    );
  }
} 