const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const { verifyToken, authorize } = require('../../auth/middleware/auth');

// User routes (require authentication)
router.post('/apply', verifyToken, loanController.applyLoan);
router.get('/my-loans', verifyToken, loanController.getUserLoans);
router.get('/:loanId', verifyToken, loanController.getLoanDetails);

// Admin/Agent routes
router.get('/', verifyToken, authorize(['ADMIN', 'AGENT']), loanController.getAllLoans);
router.post('/:loanId/approve', verifyToken, authorize(['ADMIN', 'AGENT']), loanController.approveLoan);
router.post('/:loanId/reject', verifyToken, authorize(['ADMIN', 'AGENT']), loanController.rejectLoan);
router.put('/:loanId/status', verifyToken, authorize(['ADMIN', 'AGENT']), loanController.updateLoanStatus);

module.exports = router; 