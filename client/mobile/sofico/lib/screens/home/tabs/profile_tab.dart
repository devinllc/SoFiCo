import 'package:flutter/material.dart';
import '../../../constants/colors.dart';
import '../../../constants/text_styles.dart';
import '../../../widgets/custom_button.dart';

class UserProfile {
  final String id;
  final String name;
  final String email;
  final String phone;
  final String address;
  final String profileImage;
  final List<String> documents;
  final Map<String, String> preferences;

  const UserProfile({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    required this.address,
    required this.profileImage,
    required this.documents,
    required this.preferences,
  });

  String get initials => name.split(' ').map((e) => e[0]).join().toUpperCase();
}

class ProfileTab extends StatelessWidget {
  const ProfileTab({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final user = const UserProfile(
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 98765 43210',
      address: '123 Main Street, City, State - 123456',
      profileImage: '',
      documents: ['Aadhaar Card', 'PAN Card', 'Bank Statement'],
      preferences: {
        'notifications': 'enabled',
        'language': 'en',
        'theme': 'light',
      },
    );

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildHeader(context, user),
            _buildProfileInfo(context, user),
            _buildDocuments(context, user),
            _buildPreferences(context, user),
            _buildActions(context),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, UserProfile user) {
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 48, 16, 24),
      decoration: BoxDecoration(
        color: AppColors.primary,
        borderRadius: const BorderRadius.vertical(bottom: Radius.circular(24)),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Profile',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              IconButton(
                icon: const Icon(Icons.settings, color: Colors.white),
                onPressed: () {
                  // TODO: Navigate to settings
                },
              ),
            ],
          ),
          const SizedBox(height: 24),
          CircleAvatar(
            radius: 48,
            backgroundColor: Colors.white,
            child: user.profileImage.isEmpty
                ? Text(
                    user.initials,
                    style: AppTextStyles.heading2.copyWith(color: AppColors.primary),
                  )
                : ClipOval(
                    child: Image.network(
                      user.profileImage,
                      width: 96,
                      height: 96,
                      fit: BoxFit.cover,
                    ),
                  ),
          ),
          const SizedBox(height: 16),
          Text(
            user.name,
            style: AppTextStyles.heading2.copyWith(color: Colors.white),
          ),
          const SizedBox(height: 8),
          Text(
            user.email,
            style: AppTextStyles.body.copyWith(color: Colors.white70),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileInfo(BuildContext context, UserProfile user) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Personal Information',
            style: AppTextStyles.heading3,
          ),
          const SizedBox(height: 16),
          _buildInfoCard(
            context,
            [
              _buildInfoRow(Icons.phone, 'Phone', user.phone),
              _buildInfoRow(Icons.location_on, 'Address', user.address),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDocuments(BuildContext context, UserProfile user) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Documents',
                style: AppTextStyles.heading3,
              ),
              TextButton.icon(
                onPressed: () {
                  // TODO: Add new document
                },
                icon: const Icon(Icons.add),
                label: const Text('Add New'),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildInfoCard(
            context,
            user.documents.map((doc) => _buildDocumentRow(doc)).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildPreferences(BuildContext context, UserProfile user) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Preferences',
            style: AppTextStyles.heading3,
          ),
          const SizedBox(height: 16),
          _buildInfoCard(
            context,
            [
              _buildPreferenceRow(
                'Notifications',
                user.preferences['notifications'] == 'enabled',
                (value) {
                  // TODO: Update notification preference
                },
              ),
              _buildPreferenceRow(
                'Dark Mode',
                user.preferences['theme'] == 'dark',
                (value) {
                  // TODO: Update theme preference
                },
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildActions(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          CustomButton(
            onPressed: () {
              // TODO: Navigate to edit profile
            },
            text: 'Edit Profile',
            icon: Icons.edit,
          ),
          const SizedBox(height: 12),
          CustomButton(
            onPressed: () {
              // TODO: Handle logout
            },
            text: 'Logout',
            icon: Icons.logout,
            backgroundColor: Colors.red,
          ),
        ],
      ),
    );
  }

  Widget _buildInfoCard(BuildContext context, List<Widget> children) {
    return Container(
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
      child: Column(
        children: children.map((child) {
          final isLast = child == children.last;
          return Column(
            children: [
              child,
              if (!isLast)
                const Divider(height: 1, thickness: 1, color: AppColors.border),
            ],
          );
        }).toList(),
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          Icon(icon, color: AppColors.primary, size: 24),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: AppTextStyles.caption.copyWith(
                    color: Colors.grey[600],
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  value,
                  style: AppTextStyles.body,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDocumentRow(String document) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          const Icon(Icons.description, color: AppColors.primary, size: 24),
          const SizedBox(width: 16),
          Expanded(
            child: Text(
              document,
              style: AppTextStyles.body,
            ),
          ),
          IconButton(
            icon: const Icon(Icons.visibility, color: AppColors.primary),
            onPressed: () {
              // TODO: View document
            },
          ),
          IconButton(
            icon: const Icon(Icons.download, color: AppColors.primary),
            onPressed: () {
              // TODO: Download document
            },
          ),
        ],
      ),
    );
  }

  Widget _buildPreferenceRow(
    String label,
    bool value,
    ValueChanged<bool> onChanged,
  ) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: AppTextStyles.body,
          ),
          Switch(
            value: value,
            onChanged: onChanged,
            activeThumbColor: AppColors.primary,
            activeTrackColor: AppColors.primary.withAlpha(128),
          ),
        ],
      ),
    );
  }
} 