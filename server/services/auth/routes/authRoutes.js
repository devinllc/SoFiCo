const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, authorize } = require('../middleware/auth');
const User = require('../models/User');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);

// Protected routes
router.get('/profile', verifyToken, authController.getProfile);
router.patch('/profile', verifyToken, authController.updateProfile);
router.post('/disable', verifyToken, authController.disableAccount);

// Admin only routes
router.get('/users', verifyToken, authorize('ADMIN'), authController.getAllUsers);
router.patch('/users/:id/role', verifyToken, authorize('ADMIN'), authController.updateUserRole);

module.exports = router; 