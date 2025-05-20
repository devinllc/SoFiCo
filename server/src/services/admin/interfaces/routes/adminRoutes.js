const express = require('express');
const { body, query, param } = require('express-validator');
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../../../middleware/auth');
const { validateRequest } = require('../../../middleware/validation');

const router = express.Router();

// Validation middleware
const adminValidation = [
    body('role').isIn(['super_admin', 'admin', 'manager']).withMessage('Invalid role'),
    body('department').isString().trim().notEmpty().withMessage('Department is required'),
    body('assignedRegions').isArray().withMessage('Assigned regions must be an array'),
    body('assignedRegions.*.type').isIn(['state', 'district', 'city']).withMessage('Invalid region type'),
    body('assignedRegions.*.value').isString().trim().notEmpty().withMessage('Region value is required')
];

const statusValidation = [
    body('status').isIn(['active', 'inactive', 'suspended']).withMessage('Invalid status')
];

const permissionsValidation = [
    body('permissions').isArray().withMessage('Permissions must be an array'),
    body('permissions.*.module').isString().trim().notEmpty().withMessage('Module is required'),
    body('permissions.*.actions').isArray().withMessage('Actions must be an array'),
    body('permissions.*.actions.*').isIn(['create', 'read', 'update', 'delete']).withMessage('Invalid action')
];

const regionsValidation = [
    body('regions').isArray().withMessage('Regions must be an array'),
    body('regions.*.type').isIn(['state', 'district', 'city']).withMessage('Invalid region type'),
    body('regions.*.value').isString().trim().notEmpty().withMessage('Region value is required')
];

const activityLogValidation = [
    body('module').isString().trim().notEmpty().withMessage('Module is required'),
    body('action').isString().trim().notEmpty().withMessage('Action is required'),
    body('details').optional().isObject().withMessage('Details must be an object')
];

const twoFactorValidation = [
    body('token').isString().trim().isLength({ min: 6, max: 6 }).withMessage('Token must be 6 digits')
];

const deviceValidation = [
    body('deviceId').isString().trim().notEmpty().withMessage('Device ID is required'),
    body('deviceType').isIn(['mobile', 'tablet', 'desktop']).withMessage('Invalid device type'),
    body('deviceName').isString().trim().notEmpty().withMessage('Device name is required'),
    body('os').isString().trim().notEmpty().withMessage('OS is required'),
    body('browser').optional().isString().trim().withMessage('Browser must be a string'),
    body('lastActive').optional().isISO8601().withMessage('Invalid last active date')
];

const queryValidation = [
    query('role').optional().isIn(['super_admin', 'admin', 'manager']).withMessage('Invalid role'),
    query('department').optional().isString().trim().notEmpty().withMessage('Department is required'),
    query('type').optional().isIn(['state', 'district', 'city']).withMessage('Invalid region type'),
    query('value').optional().isString().trim().notEmpty().withMessage('Region value is required'),
    query('startDate').optional().isISO8601().withMessage('Invalid start date'),
    query('endDate').optional().isISO8601().withMessage('Invalid end date'),
    query('module').optional().isString().trim().notEmpty().withMessage('Module is required'),
    query('action').optional().isString().trim().notEmpty().withMessage('Action is required'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('skip').optional().isInt({ min: 0 }).withMessage('Skip must be a non-negative integer')
];

const paramValidation = [
    param('userId').isMongoId().withMessage('Invalid user ID')
];

// All routes require authentication
router.use(authenticate);

// Admin management routes
router.post('/', authorize(['super_admin']), adminValidation, validateRequest, adminController.createAdmin);
router.get('/', authorize(['super_admin', 'admin']), adminController.getAdmin);
router.put('/', authorize(['super_admin', 'admin']), adminValidation, validateRequest, adminController.updateAdmin);
router.delete('/:userId', authorize(['super_admin']), paramValidation, validateRequest, adminController.deleteAdmin);

// Status management routes
router.put('/status/:userId', authorize(['super_admin']), paramValidation, statusValidation, validateRequest, adminController.updateStatus);

// Permissions management routes
router.put('/permissions/:userId', authorize(['super_admin']), paramValidation, permissionsValidation, validateRequest, adminController.updatePermissions);

// Region management routes
router.put('/regions', authorize(['super_admin', 'admin']), regionsValidation, validateRequest, adminController.updateAssignedRegions);

// Activity log routes
router.post('/activity', authorize(['super_admin', 'admin']), activityLogValidation, validateRequest, adminController.addActivityLog);
router.get('/activity', authorize(['super_admin', 'admin']), queryValidation, validateRequest, adminController.getActivityLog);

// Two-factor authentication routes
router.post('/2fa/setup', authorize(['super_admin', 'admin']), adminController.setupTwoFactor);
router.post('/2fa/verify', authorize(['super_admin', 'admin']), twoFactorValidation, validateRequest, adminController.verifyTwoFactor);
router.post('/2fa/enable', authorize(['super_admin', 'admin']), twoFactorValidation, validateRequest, adminController.enableTwoFactor);
router.post('/2fa/disable', authorize(['super_admin', 'admin']), twoFactorValidation, validateRequest, adminController.disableTwoFactor);

// Device management routes
router.post('/devices', authorize(['super_admin', 'admin']), deviceValidation, validateRequest, adminController.addDevice);

// Admin search routes
router.get('/search/role', authorize(['super_admin']), queryValidation, validateRequest, adminController.getAdminsByRole);
router.get('/search/department', authorize(['super_admin']), queryValidation, validateRequest, adminController.getAdminsByDepartment);
router.get('/search/region', authorize(['super_admin']), queryValidation, validateRequest, adminController.getAdminsByRegion);

module.exports = router; 