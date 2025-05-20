const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const { createClient } = require('redis');
const RedisStore = require('connect-redis').default;
const session = require('express-session');

const config = require('./config');
const { logger } = require('./utils/logger');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');
const { connectDB } = require('./utils/database');

// Initialize express app
const app = express();

// Security Middleware
app.use(helmet(config.security.helmet));
app.use(cors(config.cors));
app.use(mongoSanitize()); // Sanitize MongoDB queries
app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Compression middleware
app.use(compression());

// Rate limiting
const limiter = rateLimit(config.rateLimit);
app.use('/api', limiter);

// Logging middleware
if (config.env === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined', {
        stream: { write: message => logger.info(message.trim()) }
    }));
}

// Session management with Redis
const redisClient = createClient(config.cache.redis);
redisClient.connect().catch(console.error);

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: config.jwt.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: config.env === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

// Export the configured app
module.exports = app;