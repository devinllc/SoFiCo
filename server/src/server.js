require('dotenv').config();
const app = require('./app');
const { logger } = require('./utils/logger');

// Get port from environment or use default
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection:', err);
    // In production, you might want to exit and let your process manager restart the app
    // process.exit(1);
});