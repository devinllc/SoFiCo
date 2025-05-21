const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const Razorpay = require('razorpay');
const { verifyToken, authorize } = require('../../auth/middleware/auth');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Get wallet balance
const getBalance = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user._id });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    res.json({
      balance: wallet.balance,
      currency: wallet.currency
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create Razorpay order for adding balance
const createAddBalanceOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);

    // Create pending transaction
    const wallet = await Wallet.findOne({ user: req.user._id });
    const transaction = new Transaction({
      wallet: wallet._id,
      type: 'ADD',
      amount,
      status: 'PENDING',
      razorpayPaymentId: order.id
    });
    await transaction.save();

    res.json({
      orderId: order.id,
      amount: order.amount / 100,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Verify and complete Razorpay payment
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    } = req.body;

    // Verify signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Update transaction and wallet
    const transaction = await Transaction.findOne({
      razorpayPaymentId: razorpay_order_id
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    transaction.status = 'APPROVED';
    await transaction.save();

    const wallet = await Wallet.findById(transaction.wallet);
    wallet.balance += transaction.amount;
    await wallet.save();

    res.json({
      message: 'Payment verified successfully',
      transaction,
      newBalance: wallet.balance
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Request withdrawal
const requestWithdrawal = async (req, res) => {
  try {
    const { amount } = req.body;
    const wallet = await Wallet.findOne({ user: req.user._id });

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const transaction = new Transaction({
      wallet: wallet._id,
      type: 'WITHDRAW',
      amount,
      status: 'PENDING'
    });

    await transaction.save();

    res.json({
      message: 'Withdrawal request submitted successfully',
      transaction
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Approve withdrawal (admin only)
const approveWithdrawal = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (transaction.type !== 'WITHDRAW') {
      return res.status(400).json({ error: 'Invalid transaction type' });
    }

    if (transaction.status !== 'PENDING') {
      return res.status(400).json({ error: 'Transaction is not pending' });
    }

    const wallet = await Wallet.findById(transaction.wallet);
    if (wallet.balance < transaction.amount) {
      return res.status(400).json({ error: 'Insufficient wallet balance' });
    }

    // Update transaction and wallet
    transaction.status = 'APPROVED';
    wallet.balance -= transaction.amount;

    await transaction.save();
    await wallet.save();

    res.json({
      message: 'Withdrawal approved successfully',
      transaction,
      newBalance: wallet.balance
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get transaction history
const getTransactionHistory = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user._id });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    const transactions = await Transaction.find({ wallet: wallet._id })
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get pending withdrawal requests (admin only)
const getPendingWithdrawals = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      type: 'WITHDRAW',
      status: 'PENDING'
    })
    .populate({
      path: 'wallet',
      populate: {
        path: 'user',
        select: 'firstName lastName email phone'
      }
    })
    .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBalance,
  createAddBalanceOrder,
  verifyPayment,
  requestWithdrawal,
  approveWithdrawal,
  getTransactionHistory,
  getPendingWithdrawals
}; 