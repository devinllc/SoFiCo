const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['ACTIVE', 'PENDING', 'DISSOLVED'], default: 'PENDING' },
  progress: { type: Number, default: 0 },
  gamification: {
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Scheme = mongoose.model('Scheme', schemeSchema);
module.exports = Scheme; 