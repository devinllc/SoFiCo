import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../constants/text_styles.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final bool isOutlined;
  final bool isFullWidth;
  final Color? color;

  const CustomButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.isOutlined = false,
    this.isFullWidth = true,
    this.color,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: isFullWidth ? double.infinity : null,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: isOutlined ? Colors.transparent : (color ?? AppColors.primary),
          foregroundColor: isOutlined ? AppColors.primary : Colors.white,
          padding: const EdgeInsets.symmetric(vertical: 15),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
            side: isOutlined ? const BorderSide(color: AppColors.primary) : BorderSide.none,
          ),
          elevation: isOutlined ? 0 : 1,
        ),
        child: Text(
          text,
          style: AppTextStyles.button.copyWith(
            color: isOutlined ? AppColors.primary : Colors.white,
          ),
        ),
      ),
    );
  }
}