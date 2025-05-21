const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// Register new user
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email or phone already exists' 
      });
    }

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      phone,
      role: role || 'USER' // Default to USER role if not specified
    });

    await user.save();
    
    // Generate tokens
    const tokens = generateToken(user);
    
    res.status(201).json({
      user: user.getPublicProfile(),
      ...tokens
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ error: 'Account is disabled' });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const tokens = generateToken(user);

    res.json({
      user: user.getPublicProfile(),
      ...tokens
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    res.json(req.user.getPublicProfile());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName', 'phone', 'password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' });
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    res.json(req.user.getPublicProfile());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Disable user account
const disableAccount = async (req, res) => {
  try {
    req.user.isActive = false;
    await req.user.save();
    res.json({ message: 'Account disabled successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user role (admin only)
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.role = role;
    await user.save();
    res.json(user.getPublicProfile());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Refresh token
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findOne({ _id: decoded.id, isActive: true });

    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const tokens = generateToken(user);
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  disableAccount,
  getAllUsers,
  updateUserRole,
  refreshToken
}; 