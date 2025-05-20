const Wallet = require('../models/Wallet');
const PaymentService = require('../services/paymentService');

class WalletController {
    // Get wallet balance
    async getBalance(req, res) {
        try {
            const wallet = await Wallet.findOne({ userId: req.user._id });
            if (!wallet) {
                return res.status(404).json({ message: 'Wallet not found' });
            }
            res.json({ balance: wallet.balance });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching wallet balance', error: error.message });
        }
    }

    // Create Razorpay order for adding money
    async createPaymentOrder(req, res) {
        try {
            const { amount } = req.body;
            if (!amount || amount <= 0) {
                return res.status(400).json({ message: 'Invalid amount' });
            }

            const order = await PaymentService.createOrder(amount);
            res.json({
                orderId: order.id,
                amount: order.amount / 100, // Convert from paise to rupees
                currency: order.currency,
                key: process.env.RAZORPAY_KEY_ID
            });
        } catch (error) {
            res.status(500).json({ message: 'Error creating payment order', error: error.message });
        }
    }

    // Verify and process Razorpay payment
    async verifyPayment(req, res) {
        try {
            const { orderId, paymentId, signature, amount } = req.body;

            // Verify payment signature
            const isValid = PaymentService.verifyPaymentSignature(orderId, paymentId, signature);
            if (!isValid) {
                return res.status(400).json({ message: 'Invalid payment signature' });
            }

            // Process payment and update wallet
            const wallet = await PaymentService.processPayment(
                req.user._id,
                orderId,
                paymentId,
                amount
            );

            // Emit socket event for real-time updates
            req.app.get('io').emit('walletUpdate', {
                userId: req.user._id,
                balance: wallet.balance,
                transaction: wallet.transactions[wallet.transactions.length - 1]
            });

            res.json({
                message: 'Payment successful',
                wallet: {
                    balance: wallet.balance,
                    transaction: wallet.transactions[wallet.transactions.length - 1]
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error processing payment', error: error.message });
        }
    }

    // Withdraw money from wallet
    async withdrawMoney(req, res) {
        try {
            const { amount, description } = req.body;
            if (!amount || amount <= 0) {
                return res.status(400).json({ message: 'Invalid amount' });
            }

            const wallet = await Wallet.findOne({ userId: req.user._id });
            if (!wallet) {
                return res.status(404).json({ message: 'Wallet not found' });
            }

            if (wallet.balance < amount) {
                return res.status(400).json({ message: 'Insufficient balance' });
            }

            wallet.balance -= amount;
            wallet.transactions.push({
                type: 'DEBIT',
                amount,
                description: description || 'Money withdrawn from wallet'
            });

            await wallet.save();

            // Emit socket event for real-time updates
            req.app.get('io').emit('walletUpdate', {
                userId: req.user._id,
                balance: wallet.balance,
                transaction: wallet.transactions[wallet.transactions.length - 1]
            });

            res.json({
                message: 'Money withdrawn successfully',
                balance: wallet.balance,
                transaction: wallet.transactions[wallet.transactions.length - 1]
            });
        } catch (error) {
            res.status(500).json({ message: 'Error withdrawing money from wallet', error: error.message });
        }
    }

    // Get transaction history
    async getTransactionHistory(req, res) {
        try {
            const wallet = await Wallet.findOne({ userId: req.user._id });
            if (!wallet) {
                return res.status(404).json({ message: 'Wallet not found' });
            }
            res.json({ transactions: wallet.transactions });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching transaction history', error: error.message });
        }
    }

    // Get payment details
    async getPaymentDetails(req, res) {
        try {
            const { paymentId } = req.params;
            const payment = await PaymentService.getPaymentDetails(paymentId);
            res.json({ payment });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching payment details', error: error.message });
        }
    }

    // Initiate refund
    async initiateRefund(req, res) {
        try {
            const { paymentId, amount } = req.body;
            const refund = await PaymentService.initiateRefund(paymentId, amount);
            res.json({ message: 'Refund initiated successfully', refund });
        } catch (error) {
            res.status(500).json({ message: 'Error initiating refund', error: error.message });
        }
    }
}

module.exports = new WalletController(); 