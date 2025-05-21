const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getReadyPromise } = require('../../../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

// Generate JWT token
const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };
  
  return {
    accessToken: jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }),
    refreshToken: jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' })
  };
};

// Verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    // Ensure database is ready
    await getReadyPromise();

    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, isActive: true });

    if (!user) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Role-based access control middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Access denied. Insufficient permissions.' 
      });
    }
    next();
  };
};

// Refresh token middleware
const refreshToken = async (req, res) => {
  try {
    // Ensure database is ready
    await getReadyPromise();

    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
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
  generateToken,
  verifyToken,
  authorize,
  refreshToken
}; 