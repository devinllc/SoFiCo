import 'package:flutter/material.dart';

class AppColors {
  // Primary colors
  static const Color primary = Color(0xFF2563EB); // Modern blue
  static const Color primaryLight = Color(0xFF60A5FA);
  static const Color primaryDark = Color(0xFF1E40AF);
  
  // Secondary colors
  static const Color secondary = Color(0xFF7C3AED); // Modern purple
  static const Color secondaryLight = Color(0xFFA78BFA);
  static const Color secondaryDark = Color(0xFF5B21B6);
  
  // Accent colors
  static const Color accent = Color(0xFFEF4444); // Modern red
  static const Color accentLight = Color(0xFFFCA5A5);
  static const Color accentDark = Color(0xFFB91C1C);
  
  // Success colors
  static const Color success = Color(0xFF10B981); // Modern green
  static const Color successLight = Color(0xFF6EE7B7);
  static const Color successDark = Color(0xFF047857);
  
  // Warning colors
  static const Color warning = Color(0xFFF59E0B); // Modern orange
  static const Color warningLight = Color(0xFFFCD34D);
  static const Color warningDark = Color(0xFFB45309);
  
  // Info colors
  static const Color info = Color(0xFF3B82F6); // Modern blue
  static const Color infoLight = Color(0xFF93C5FD);
  static const Color infoDark = Color(0xFF1D4ED8);
  
  // Neutral colors
  static const Color background = Color(0xFFF8FAFC);
  static const Color surface = Colors.white;
  static const Color textDark = Color(0xFF1E293B);
  static const Color textLight = Color(0xFF64748B);
  static const Color border = Color(0xFFE2E8F0);
  static const Color divider = Color(0xFFE2E8F0);
  static const Color transparent = Colors.transparent;
  
  // Semantic colors
  static const Color error = accent;
  static const Color errorLight = accentLight;
  static const Color errorDark = accentDark;
  
  // Gradient colors
  static const List<Color> primaryGradient = [
    Color(0xFF2563EB),
    Color(0xFF7C3AED),
  ];
  
  static const List<Color> secondaryGradient = [
    Color(0xFF7C3AED),
    Color(0xFFEF4444),
  ];
  
  static const List<Color> successGradient = [
    Color(0xFF10B981),
    Color(0xFF3B82F6),
  ];
  
  static const List<Color> warningGradient = [
    Color(0xFFF59E0B),
    Color(0xFFEF4444),
  ];
  
  // Overlay colors
  static const Color overlay = Color(0x80000000);
  static const Color overlayLight = Color(0x40000000);
  static const Color overlayDark = Color(0xCC000000);
  
  // Shadow colors
  static const Color shadow = Color(0x1A000000);
  static const Color shadowLight = Color(0x0D000000);
  static const Color shadowDark = Color(0x26000000);
}