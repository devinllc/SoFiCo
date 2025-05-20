const razorpay = require('../config/razorpay');
const Wallet = require('../models/Wallet');

class PaymentService {
    // Create a new Razorpay order
    static async createOrder(amount, currency = 'INR') {
        try {
            const options = {
                amount: amount * 100, // Razorpay expects amount in paise
                currency,
                receipt: `receipt_${Date.now()}`,
                payment_capture: 1 // Auto capture payment
            };

            const order = await razorpay.orders.create(options);
            return order;
        } catch (error) {
            throw new Error(`Error creating Razorpay order: ${error.message}`);
        }
    }

    // Verify payment signature
    static verifyPaymentSignature(orderId, paymentId, signature) {
        try {
            const generatedSignature = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(`${orderId}|${paymentId}`)
                .digest('hex');

            return generatedSignature === signature;
        } catch (error) {
            throw new Error(`Error verifying payment: ${error.message}`);
        }
    }

    // Process successful payment
    static async processPayment(userId, orderId, paymentId, amount) {
        try {
            // Find or create wallet
            let wallet = await Wallet.findOne({ userId });
            if (!wallet) {
                wallet = new Wallet({ userId, balance: 0 });
            }

            // Add amount to wallet
            wallet.balance += amount;
            wallet.transactions.push({
                type: 'CREDIT',
                amount,
                description: `Payment via Razorpay (Order: ${orderId})`,
                paymentId,
                orderId
            });

            await wallet.save();
            return wallet;
        } catch (error) {
            throw new Error(`Error processing payment: ${error.message}`);
        }
    }

    // Get payment details
    static async getPaymentDetails(paymentId) {
        try {
            const payment = await razorpay.payments.fetch(paymentId);
            return payment;
        } catch (error) {
            throw new Error(`Error fetching payment details: ${error.message}`);
        }
    }

    // Initiate refund
    static async initiateRefund(paymentId, amount) {
        try {
            const refund = await razorpay.payments.refund(paymentId, {
                amount: amount * 100 // Convert to paise
            });
            return refund;
        } catch (error) {
            throw new Error(`Error initiating refund: ${error.message}`);
        }
    }
}

module.exports = PaymentService; 