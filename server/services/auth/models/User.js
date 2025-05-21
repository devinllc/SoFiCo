const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    enum: ['ADMIN', 'AGENT', 'USER'],
    default: 'USER'
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    trim: true
  },
  apiKey: {
    type: String,
    sparse: true // This allows multiple null values
  },
  isActive: {
    type: Boolean,
    default: true
  },
  kycStatus: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'VERIFIED', 'REJECTED'],
    default: 'PENDING'
  },
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generate username from email before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }

  // Generate username from email if not provided
  if (!this.username && this.email) {
    this.username = this.email.split('@')[0];
  }

  // Generate API key if not provided
  if (!this.apiKey) {
    this.apiKey = crypto.randomBytes(32).toString('hex');
  }

  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

// Define indexes in one place
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true, sparse: true });
userSchema.index({ apiKey: 1 }, { unique: true, sparse: true });

const User = mongoose.model('User', userSchema);

module.exports = User; 