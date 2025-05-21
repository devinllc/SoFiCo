import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../constants/text_styles.dart';

class CustomButton extends StatefulWidget {
  final String text;
  final VoidCallback onPressed;
  final IconData? icon;
  final bool isOutlined;
  final bool isFullWidth;
  final Color? color;
  final Color? backgroundColor;
  final bool isLoading;
  final double? height;
  final double? width;

  const CustomButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.icon,
    this.isOutlined = false,
    this.isFullWidth = true,
    this.color,
    this.backgroundColor,
    this.isLoading = false,
    this.height,
    this.width,
  }) : super(key: key);

  @override
  State<CustomButton> createState() => _CustomButtonState();
}

class _CustomButtonState extends State<CustomButton> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  bool _isHovered = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 150),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleTapDown(TapDownDetails details) {
    _controller.forward();
  }

  void _handleTapUp(TapUpDetails details) {
    _controller.reverse();
  }

  void _handleTapCancel() {
    _controller.reverse();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTapDown: _handleTapDown,
        onTapUp: _handleTapUp,
        onTapCancel: _handleTapCancel,
        child: ScaleTransition(
          scale: _scaleAnimation,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            width: widget.isFullWidth ? double.infinity : widget.width,
            height: widget.height ?? 48,
            decoration: BoxDecoration(
              color: widget.isOutlined
                  ? AppColors.transparent
                  : (widget.backgroundColor ?? theme.colorScheme.primary),
              borderRadius: BorderRadius.circular(12),
              border: widget.isOutlined
                  ? Border.all(
                      color: widget.color ?? theme.colorScheme.primary,
                      width: 1.5,
                    )
                  : null,
              boxShadow: !widget.isOutlined && !widget.isLoading
                  ? [
                      BoxShadow(
                        color: (widget.backgroundColor ?? theme.colorScheme.primary)
                            .withOpacity(_isHovered ? 0.3 : 0.2),
                        blurRadius: _isHovered ? 12 : 8,
                        offset: Offset(0, _isHovered ? 4 : 2),
                      ),
                    ]
                  : null,
            ),
            child: Material(
              color: AppColors.transparent,
              child: InkWell(
                onTap: widget.isLoading ? null : widget.onPressed,
                borderRadius: BorderRadius.circular(12),
                child: Center(
                  child: widget.isLoading
                      ? SizedBox(
                          width: 24,
                          height: 24,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            valueColor: AlwaysStoppedAnimation<Color>(
                              widget.isOutlined
                                  ? (widget.color ?? theme.colorScheme.primary)
                                  : AppColors.background,
                            ),
                          ),
                        )
                      : Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            if (widget.icon != null) ...[
                              Icon(
                                widget.icon,
                                size: 20,
                                color: widget.isOutlined
                                    ? (widget.color ?? theme.colorScheme.primary)
                                    : AppColors.background,
                              ),
                              const SizedBox(width: 8),
                            ],
                            Text(
                              widget.text,
                              style: AppTextStyles.button.copyWith(
                                color: widget.isOutlined
                                    ? (widget.color ?? theme.colorScheme.primary)
                                    : AppColors.background,
                              ),
                            ),
                          ],
                        ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}