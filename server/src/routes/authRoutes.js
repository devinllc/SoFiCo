const express = require('express');
const router = express.Router();
const signupRoutes = require('./signupRoutes');
// Import route modules
// const userRoutes = require('./userRoutes');


// Use route modules
// router.use('/users', userRoutes);
router.use('/signup', signupRoutes);


module.exports = router;