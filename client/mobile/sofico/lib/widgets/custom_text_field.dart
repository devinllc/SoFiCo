import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../constants/colors.dart';
import '../constants/text_styles.dart';

class CustomTextField extends StatefulWidget {
  final String label;
  final String? hint;
  final TextEditingController? controller;
  final bool obscureText;
  final TextInputType? keyboardType;
  final String? Function(String?)? validator;
  final Widget? suffixIcon;
  final List<TextInputFormatter>? inputFormatters;
  final int? maxLines;
  final int? minLines;
  final bool enabled;
  final FocusNode? focusNode;
  final void Function(String)? onChanged;
  final void Function()? onTap;
  final bool readOnly;
  final TextCapitalization textCapitalization;
  final EdgeInsetsGeometry? contentPadding;
  final String? errorText;
  final String? helperText;
  final bool autofocus;

  const CustomTextField({
    Key? key,
    required this.label,
    this.hint,
    this.controller,
    this.obscureText = false,
    this.keyboardType,
    this.validator,
    this.suffixIcon,
    this.inputFormatters,
    this.maxLines = 1,
    this.minLines,
    this.enabled = true,
    this.focusNode,
    this.onChanged,
    this.onTap,
    this.readOnly = false,
    this.textCapitalization = TextCapitalization.none,
    this.contentPadding,
    this.errorText,
    this.helperText,
    this.autofocus = false,
  }) : super(key: key);

  @override
  State<CustomTextField> createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _labelAnimation;
  bool _isFocused = false;
  bool _hasError = false;
  bool _hasText = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _labelAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
    _hasText = widget.controller?.text.isNotEmpty ?? false;
    if (_hasText) {
      _controller.value = 1;
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _onFocusChange(bool hasFocus) {
    setState(() {
      _isFocused = hasFocus;
      if (hasFocus || _hasText) {
        _controller.forward();
      } else {
        _controller.reverse();
      }
    });
  }

  void _onTextChange(String text) {
    setState(() {
      _hasText = text.isNotEmpty;
      if (_hasText) {
        _controller.forward();
      } else if (!_isFocused) {
        _controller.reverse();
      }
    });
    widget.onChanged?.call(text);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    _hasError = widget.errorText != null;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Focus(
          onFocusChange: _onFocusChange,
          child: AnimatedBuilder(
            animation: _labelAnimation,
            builder: (context, child) {
              return Stack(
                children: [
                  if (widget.label.isNotEmpty)
                    Positioned(
                      left: 16,
                      top: 8 + (_labelAnimation.value * -12),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 4),
                        color: theme.scaffoldBackgroundColor,
                        child: Text(
                          widget.label,
                          style: AppTextStyles.caption.copyWith(
                            color: _hasError
                                ? theme.colorScheme.error
                                : _isFocused
                                    ? theme.colorScheme.primary
                                    : AppColors.textLight,
                          ),
                        ),
                      ),
                    ),
                  TextFormField(
                    controller: widget.controller,
                    focusNode: widget.focusNode,
                    obscureText: widget.obscureText,
                    keyboardType: widget.keyboardType,
                    validator: widget.validator,
                    inputFormatters: widget.inputFormatters,
                    maxLines: widget.maxLines,
                    minLines: widget.minLines,
                    enabled: widget.enabled,
                    onChanged: _onTextChange,
                    onTap: widget.onTap,
                    readOnly: widget.readOnly,
                    textCapitalization: widget.textCapitalization,
                    autofocus: widget.autofocus,
                    style: AppTextStyles.body,
                    decoration: InputDecoration(
                      hintText: widget.hint,
                      hintStyle: AppTextStyles.body.copyWith(
                        color: AppColors.textLight.withOpacity(0.7),
                      ),
                      filled: true,
                      fillColor: widget.enabled
                          ? (_isFocused ? Colors.white : Colors.grey[50])
                          : Colors.grey[100],
                      suffixIcon: widget.suffixIcon,
                      contentPadding: widget.contentPadding ??
                          EdgeInsets.only(
                            left: 16,
                            right: 16,
                            top: widget.label.isNotEmpty ? 24 : 16,
                            bottom: 16,
                          ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(
                          color: _hasError
                              ? theme.colorScheme.error
                              : AppColors.border,
                          width: 1.5,
                        ),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(
                          color: _hasError
                              ? theme.colorScheme.error
                              : AppColors.border,
                          width: 1.5,
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(
                          color: _hasError
                              ? theme.colorScheme.error
                              : theme.colorScheme.primary,
                          width: 2,
                        ),
                      ),
                      errorBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(
                          color: theme.colorScheme.error,
                          width: 1.5,
                        ),
                      ),
                      focusedErrorBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(
                          color: theme.colorScheme.error,
                          width: 2,
                        ),
                      ),
                      errorText: widget.errorText,
                      helperText: widget.helperText,
                      helperStyle: AppTextStyles.caption.copyWith(
                        color: AppColors.textLight,
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ),
      ],
    );
  }
}