const express = require('express');
const router = express.Router();

// Import all service routers
const authRouter = require('./auth/routes');
const userRouter = require('./user/routes');
const agentRouter = require('./agent/routes');
const adminRouter = require('./admin/routes');
const walletRouter = require('./wallet/routes');
const loanRouter = require('./loan/routes');
const schemeRouter = require('./scheme/routes');
const notificationRouter = require('./notification/routes');

// Register all service routes
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/agents', agentRouter);
router.use('/admin', adminRouter);
router.use('/wallet', walletRouter);
router.use('/loans', loanRouter);
router.use('/schemes', schemeRouter);
router.use('/notifications', notificationRouter);

module.exports = router; 