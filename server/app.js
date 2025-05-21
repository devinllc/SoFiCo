const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
// const authRoutes= require('./routes/authRoutes');
// const walletRoutes= require('./routes/walletRoutes');
const cors = require('cors');

// Import routes
const authRoutes = require('./services/auth/routes/authRoutes');
const walletRoutes = require('./services/wallet/routes/walletRoutes');
const agentRoutes = require('./services/agent/routes/agentRoutes');
const loanRoutes = require('./services/loan/routes/loanRoutes');
const schemeRoutes = require('./services/scheme/routes/schemeRoutes');

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));




// Configure CORS
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001','https://servs.ufdevs.me', 'http://localhost:5174', 'http://localhost:5173','https://servs.ufdevs.me/login','https://ufdevs.me'],
    credentials: true,  
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
app.use('/auth', authRoutes);
app.use('/wallet', walletRoutes);
app.use('/agent', agentRoutes);
app.use('/loan', loanRoutes);
app.use('/scheme', schemeRoutes);
// app.listen(3000);// ✅ Only start server if not on Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  }
module.exports = app;
