const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['APPLIED', 'APPROVED', 'REJECTED', 'DISBURSED', 'CLOSED'], default: 'APPLIED' },
  history: [{
    status: String,
    date: Date,
    note: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Loan = mongoose.model('Loan', loanSchema);
module.exports = Loan; 