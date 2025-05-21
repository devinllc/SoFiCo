require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const walletRoutes = require('./routes/walletRoutes');

// Log startup information
console.log('Starting application with configuration:', {
    NODE_ENV: process.env.NODE_ENV || 'not set',
    NODE_VERSION: process.version,
    PLATFORM: process.platform,
    MEMORY_USAGE: process.memoryUsage(),
    ENV_VARS: {
        MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
        JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
        RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID ? 'Set' : 'Not set',
        RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET ? 'Set' : 'Not set',
        CLIENT_URL: process.env.CLIENT_URL || 'Not set'
    }
});

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
}));

// Lazy MongoDB connection with retry
const connectDB = async (retries = 3) => {
    if (mongoose.connection.readyState === 1) {
        console.log('MongoDB already connected');
        return;
    }

    for (let i = 0; i < retries; i++) {
        try {
            console.log(`Attempting MongoDB connection (attempt ${i + 1}/${retries})...`);
            console.log('MongoDB URI format check:', {
                hasProtocol: process.env.MONGODB_URI?.startsWith('mongodb://') || process.env.MONGODB_URI?.startsWith('mongodb+srv://'),
                length: process.env.MONGODB_URI?.length || 0
            });
            
            await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                connectTimeoutMS: 10000,
                retryWrites: true,
                retryReads: true
            });
            
            console.log('MongoDB Connected Successfully');
            return;
        } catch (err) {
            console.error(`MongoDB connection attempt ${i + 1} failed:`, {
                name: err.name,
                message: err.message,
                code: err.code,
                stack: err.stack
            });
            
            if (i === retries - 1) {
                console.error('All MongoDB connection attempts failed');
                throw err;
            }
            
            console.log(`Waiting 1 second before retry ${i + 2}...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
};

// Health check route with detailed status
app.get('/', async (req, res) => {
    try {
        const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
        const systemInfo = {
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            nodeVersion: process.version,
            platform: process.platform,
            env: process.env.NODE_ENV
        };
        
        res.status(200).json({
            status: 'OK',
            message: 'API is Healthy',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            system: systemInfo,
            database: {
                status: dbStatus,
                readyState: mongoose.connection.readyState,
                host: mongoose.connection.host || 'not connected'
            },
            project: {
                name: "SoFiCo",
                version: '1.0.0',
                description: 'A Social Investment and Loan Apps',
                by: 'Ramesh Vishwakarma & Abhishek Raj'
            },
            company: {
                name: 'UNFILTER DEVELOPERS (ufdevs.me)',
                frontend: '',
                contact: '7666893227'
            }
        });
    } catch (error) {
        console.error('Health check error:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        
        res.status(500).json({
            status: 'ERROR',
            message: 'Health check failed',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
            timestamp: new Date().toISOString()
        });
    }
});

// Connect to DB before handling routes with timeout
app.use(async (req, res, next) => {
    const timeout = setTimeout(() => {
        console.error('Database connection timeout');
        next(new Error('Database connection timeout'));
    }, 10000); // 10 second timeout

    try {
        await connectDB();
        clearTimeout(timeout);
        next();
    } catch (error) {
        clearTimeout(timeout);
        console.error('Database connection error:', error);
        next(error);
    }
});

// Routes
app.use('/auth', authRoutes);
app.use('/wallet', walletRoutes);

// Error handling middleware with detailed logging
app.use((err, req, res, next) => {
    const errorDetails = {
        message: err.message,
        stack: err.stack,
        name: err.name,
        code: err.code,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    };
    
    console.error('Error details:', errorDetails);
    
    // Don't expose internal errors in production
    const clientError = process.env.NODE_ENV === 'development' 
        ? errorDetails 
        : { message: 'Something went wrong!' };

    res.status(500).json(clientError);
});

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
