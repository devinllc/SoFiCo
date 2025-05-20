const cluster = require('cluster');
const os = require('os');
const app = require('./app');
const config = require('./config');
const { logger } = require('./utils/logger');
const { connectDB } = require('./utils/database');

const numCPUs = os.cpus().length;

if (cluster.isMaster && config.env === 'production') {
    logger.info(`Master ${process.pid} is running`);
    logger.info(`Forking for ${numCPUs} CPUs`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        logger.warn(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
        logger.info('Starting a new worker');
        cluster.fork();
    });
} else {
    // Workers can share any TCP connection
    const server = app.listen(config.port, async () => {
        try {
            await connectDB();
            logger.info(`Worker ${process.pid} started`);
            logger.info(`Server running in ${config.env} mode on port ${config.port}`);
        } catch (error) {
            logger.error('Failed to start server:', error);
            process.exit(1);
        }
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal) => {
        logger.info(`${signal} received. Starting graceful shutdown...`);
        
        // Close server first
        server.close(() => {
            logger.info('HTTP server closed');
        });

        // Close database connection
        try {
            await mongoose.connection.close();
            logger.info('Database connection closed');
        } catch (err) {
            logger.error('Error closing database connection:', err);
        }

        // Close Redis connection
        try {
            await redisClient.quit();
            logger.info('Redis connection closed');
        } catch (err) {
            logger.error('Error closing Redis connection:', err);
        }

        process.exit(0);
    };

    // Handle various termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
        logger.error('Uncaught Exception:', err);
        gracefulShutdown('UNCAUGHT_EXCEPTION');
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
        logger.error('Unhandled Rejection:', err);
        gracefulShutdown('UNHANDLED_REJECTION');
    });

    // Handle process warnings
    process.on('warning', (warning) => {
        logger.warn('Process Warning:', warning);
    });
}