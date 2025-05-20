require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const walletRoutes = require('./routes/walletRoutes');

// Log environment variables (excluding sensitive ones)
console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
    JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID ? 'Set' : 'Not set',
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET ? 'Set' : 'Not set',
    CLIENT_URL: process.env.CLIENT_URL || 'Not set'
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
            await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 5000, // 5 second timeout
                socketTimeoutMS: 45000, // 45 second timeout
            });
            console.log('MongoDB Connected Successfully');
            return;
        } catch (err) {
            console.error(`MongoDB connection attempt ${i + 1} failed:`, err);
            if (i === retries - 1) throw err;
            // Wait for 1 second before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
};

// Health check route with detailed status
app.get('/', async (req, res) => {
    try {
        const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
        res.status(200).json({
            status: 'OK',
            message: 'API is Healthy',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            database: {
                status: dbStatus,
                readyState: mongoose.connection.readyState
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
        console.error('Health check error:', error);
        res.status(500).json({
            status: 'ERROR',
            message: 'Health check failed',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
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