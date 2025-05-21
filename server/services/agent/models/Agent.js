const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  assignedLoans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }],
  performanceScore: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent; 