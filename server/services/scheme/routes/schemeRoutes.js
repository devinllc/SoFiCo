const express = require('express');
const router = express.Router();
const schemeController = require('../controllers/schemeController');
const { verifyToken, authorize } = require('../../auth/middleware/auth');

// User routes (require authentication)
router.post('/', verifyToken, schemeController.createScheme);
router.get('/my-schemes', verifyToken, schemeController.getUserSchemes);
router.get('/:schemeId', verifyToken, schemeController.getSchemeDetails);
router.post('/:schemeId/join', verifyToken, schemeController.joinScheme);
router.post('/:schemeId/dissolve', verifyToken, schemeController.dissolveScheme);
router.post('/:schemeId/members', verifyToken, schemeController.addMember);
router.put('/:schemeId/progress', verifyToken, schemeController.updateProgress);

// Admin only routes
router.get('/', verifyToken, authorize(['ADMIN']), schemeController.getAllSchemes);
router.post('/:schemeId/approve', verifyToken, authorize(['ADMIN']), schemeController.approveScheme);

module.exports = router; 