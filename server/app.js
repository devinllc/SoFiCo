const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./services/auth/routes/authRoutes');
// const walletRoutes = require('./services/wallet/routes/walletRoutes');
const agentRoutes = require('./services/agent/routes/agentRoutes');
const loanRoutes= require('./services/loan/routes/loanRoutes');
const schemeRoutes = require('./services/scheme/routes/schemeRoutes');
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Configure CORS
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));

app.get("/", (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'API is Healthy',
        timestamp: new Date().toISOString(),
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
});

// Routes
app.use('/api/auth', authRoutes);
// app.use('/wallet', walletRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/loan', loanRoutes);
app.use('/api/scheme', schemeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Something went wrong!',
            status: err.status || 500
        }
    });
});

// Initialize database and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        
        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;
