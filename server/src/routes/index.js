const express = require('express');
const router = express.Router();

// Import route modules
// const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

// Use route modules
// router.use('/users', userRoutes);
router.use('/auth', authRoutes);

// Default route
router.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

module.exports = router;