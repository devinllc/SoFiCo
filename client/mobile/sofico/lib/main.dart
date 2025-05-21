import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'services/service_provider.dart';
import 'screens/splash_screen.dart';
import 'constants/colors.dart';
import 'constants/text_styles.dart';

void main() {
  runApp(
    ChangeNotifierProvider<ServiceProvider>(
      create: (_) => ServiceProvider(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SoFiCo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.primary,
          primary: AppColors.primary,
          secondary: AppColors.secondary,
          error: AppColors.accent,
          background: AppColors.background,
        ),
        fontFamily: 'Poppins',
        scaffoldBackgroundColor: AppColors.background,
        appBarTheme: AppBarTheme(
          backgroundColor: AppColors.background,
          elevation: 0,
          centerTitle: true,
          iconTheme: const IconThemeData(color: AppColors.primary),
          titleTextStyle: AppTextStyles.heading3.copyWith(color: AppColors.primary),
        ),
        cardTheme: CardThemeData(
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: const BorderSide(color: AppColors.border),
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            elevation: 0,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.grey[50],
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: AppColors.border),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: AppColors.border),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: AppColors.primary, width: 2),
          ),
          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: AppColors.accent, width: 1),
          ),
          hintStyle: AppTextStyles.body.copyWith(color: AppColors.textLight),
        ),
        textTheme: TextTheme(
          displayLarge: AppTextStyles.heading1,
          displayMedium: AppTextStyles.heading2,
          displaySmall: AppTextStyles.heading3,
          bodyLarge: AppTextStyles.body,
          bodyMedium: AppTextStyles.bodyLight,
          labelLarge: AppTextStyles.button,
          bodySmall: AppTextStyles.caption,
        ),
      ),
      home: const SplashScreen(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('SoFiCo'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Welcome to SoFiCo',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () async {
                try {
                  // Example of using the auth service
                  final authService = ServiceProvider.of(context).authService;
                  final response = await authService.login(
                    email: 'test@example.com',
                    password: 'password123',
                  );
                  print('Login response: $response');
                } catch (e) {
                  print('Error: $e');
                }
              },
              child: const Text('Test Login'),
            ),
          ],
        ),
      ),
    );
  }
}