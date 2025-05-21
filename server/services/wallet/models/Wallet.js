const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet; 