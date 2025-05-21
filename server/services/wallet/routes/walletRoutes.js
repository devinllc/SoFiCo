const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const { verifyToken, authorize } = require('../../auth/middleware/auth');

// Public routes (require authentication)
router.get('/balance', verifyToken, walletController.getBalance);
router.post('/add-balance', verifyToken, walletController.createAddBalanceOrder);
router.post('/verify-payment', verifyToken, walletController.verifyPayment);
router.post('/withdraw', verifyToken, walletController.requestWithdrawal);
router.get('/transactions', verifyToken, walletController.getTransactionHistory);

// Admin only routes
router.get('/pending-withdrawals', verifyToken, authorize(['ADMIN']), walletController.getPendingWithdrawals);
router.post('/approve-withdrawal/:transactionId', verifyToken, authorize(['ADMIN']), walletController.approveWithdrawal);

module.exports = router; 