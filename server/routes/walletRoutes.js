const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const auth = require('../middleware/auth'); // You'll need to create this middleware

// Apply auth middleware to all wallet routes
router.use(auth);

// Get wallet balance
router.get('/balance', walletController.getBalance);

// Razorpay payment routes
router.post('/payment/create-order', walletController.createPaymentOrder);
router.post('/payment/verify', walletController.verifyPayment);
router.get('/payment/:paymentId', walletController.getPaymentDetails);
router.post('/payment/refund', walletController.initiateRefund);

// Withdraw money from wallet
router.post('/withdraw', walletController.withdrawMoney);

// Get transaction history
router.get('/transactions', walletController.getTransactionHistory);

module.exports = router;