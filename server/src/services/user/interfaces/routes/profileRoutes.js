const express = require('express');
const { body, param } = require('express-validator');
const profileController = require('../controllers/profileController');
const { authenticate, authorize } = require('../../../middlewares/auth');
const { validateRequest } = require('../../../middlewares/validateRequest');

const router = express.Router();

// Validation middleware
const profileValidation = [
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('phone').trim().matches(/^\+?[1-9]\d{1,14}$/),
    body('dateOfBirth').isISO8601(),
    body('address').optional().isObject(),
    body('address.street').optional().trim(),
    body('address.city').optional().trim(),
    body('address.state').optional().trim(),
    body('address.country').optional().trim(),
    body('address.postalCode').optional().trim(),
    validateRequest
];

const kycDocumentValidation = [
    body('type').isIn(['aadhar', 'pan', 'passport', 'driving_license']),
    body('number').trim().notEmpty(),
    body('documentUrl').optional().isURL(),
    validateRequest
];

const bankDetailsValidation = [
    body('accountNumber').trim().notEmpty(),
    body('ifscCode').trim().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/),
    body('accountHolderName').trim().notEmpty(),
    body('bankName').trim().notEmpty(),
    validateRequest
];

const preferencesValidation = [
    body('language').optional().isIn(['en', 'hi']),
    body('notifications').optional().isObject(),
    body('notifications.email').optional().isBoolean(),
    body('notifications.sms').optional().isBoolean(),
    body('notifications.push').optional().isBoolean(),
    validateRequest
];

const deviceValidation = [
    body('deviceId').trim().notEmpty(),
    body('deviceType').trim().notEmpty(),
    validateRequest
];

// Protected routes
router.use(authenticate);

// Profile management routes
router.post('/', profileValidation, profileController.createProfile);
router.get('/', profileController.getProfile);
router.put('/', profileValidation, profileController.updateProfile);
router.delete('/', profileController.deleteProfile);

// KYC routes
router.post('/kyc/documents', kycDocumentValidation, profileController.submitKycDocument);
router.put('/kyc/documents/:documentType/verify', [
    param('documentType').isIn(['aadhar', 'pan', 'passport', 'driving_license']),
    body('verified').isBoolean(),
    validateRequest
], authorize(['admin']), profileController.verifyKycDocument);

// Bank details routes
router.put('/bank-details', bankDetailsValidation, profileController.updateBankDetails);
router.put('/bank-details/verify', [
    body('verified').isBoolean(),
    validateRequest
], authorize(['admin']), profileController.verifyBankDetails);

// Preferences routes
router.put('/preferences', preferencesValidation, profileController.updatePreferences);

// Device management routes
router.post('/devices', deviceValidation, profileController.addDevice);

// Admin routes
router.get('/kyc/pending', authorize(['admin']), profileController.getPendingKycProfiles);

module.exports = router; 