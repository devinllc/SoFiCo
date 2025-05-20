const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticate, authorize } = require('../../../middlewares/auth');
const { validateRequest } = require('../../../middlewares/validateRequest');

const router = express.Router();

// Validation middleware
const registerValidation = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
    body('role').optional().isIn(['user', 'agent', 'admin']),
    validateRequest
];

const loginValidation = [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    validateRequest
];

const mfaValidation = [
    body('token').isLength({ min: 6, max: 6 }).isNumeric(),
    validateRequest
];

const refreshTokenValidation = [
    body('refreshToken').notEmpty(),
    validateRequest
];

// Public routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.post('/verify-mfa', mfaValidation, authController.verifyMFA);
router.post('/refresh-token', refreshTokenValidation, authController.refreshToken);

// Protected routes
router.use(authenticate);

// MFA routes
router.get('/mfa/setup', authController.setupMFA);
router.post('/mfa/enable', mfaValidation, authController.enableMFA);
router.post('/mfa/disable', mfaValidation, authController.disableMFA);

// Logout routes
router.post('/logout', refreshTokenValidation, authController.logout);
router.post('/logout-all', authController.logoutAll);

module.exports = router; 