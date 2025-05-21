// dependencies
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const authRoutes = require('./services/auth/routes/authRoutes');
const agentRoutes = require('./services/agent/routes/agentRoutes');
const loanRoutes = require('./services/loan/routes/loanRoutes');
const schemeRoutes = require('./services/scheme/routes/schemeRoutes');

const cors = require('cors');
const db = require("./config/database");

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));




// Configure CORS
app.use(cors({
    origin: ['*'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
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
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to Sofico API',
        version: '1.0.0',
        endpoints: {
            auth: '/auth',
            agent: '/agent',
            loan: '/loan',
            scheme: '/scheme'
        }
    });
});

// API Routes
app.use('/auth', authRoutes);
// app.use('/wallet', walletRoutes);
app.use('/agent', agentRoutes);
app.use('/loan', loanRoutes);
app.use('/scheme', schemeRoutes);

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Route ${req.originalUrl} not found`,
        method: req.method
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// app.listen(3000);// ✅ Only start server if not on Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  }
module.exports = app;
