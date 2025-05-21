const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require('cors');
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
    origin:['http://localhost:3000','http://localhost:3001','http://localhost:5173','http://localhost:5174'],
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
app.use('/auth', authRoutes);
// app.use('/wallet', walletRoutes);
app.use('/agent', agentRoutes);
app.use('/loan', loanRoutes);
app.use('/scheme', schemeRoutes);

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
const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
// Initialize database and start server



module.exports = app;