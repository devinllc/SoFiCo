const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const { verifyToken, authorize } = require('../../auth/middleware/auth');

// Admin only routes
router.post('/register', verifyToken, authorize(['ADMIN']), agentController.registerAgent);
router.post('/:agentId/performance', verifyToken, authorize(['ADMIN']), agentController.updatePerformanceScore);

// Agent routes (require agent role)
router.get('/profile', verifyToken, authorize(['AGENT']), agentController.getAgentProfile);
router.get('/loans', verifyToken, authorize(['AGENT']), agentController.getAssignedLoans);
router.post('/loans/:loanId/assign', verifyToken, authorize(['AGENT']), agentController.assignLoan);
router.get('/users', verifyToken, authorize(['AGENT']), agentController.getCreatedUsers);
router.post('/users', verifyToken, authorize(['AGENT']), agentController.createUser);

module.exports = router; 