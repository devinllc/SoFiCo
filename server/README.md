# SoFiCo Backend Development Guide

This guide will walk you through building a secure, scalable backend for a fintech application using Node.js, Express, MongoDB, and modern best practices.

## 📚 Table of Contents
1. [Understanding the Architecture](#understanding-the-architecture)
2. [Setting Up the Project](#setting-up-the-project)
3. [Database Design](#database-design)
4. [Authentication System](#authentication-system)
5. [Wallet System](#wallet-system)
6. [Payment Integration](#payment-integration)
7. [Real-time Updates](#real-time-updates)
8. [Security Best Practices](#security-best-practices)
9. [Testing and Deployment](#testing-and-deployment)

## Understanding the Architecture

### MVC Pattern
We use the Model-View-Controller (MVC) pattern to organize our code:

```
server/
├── config/             # Configuration and setup
├── controllers/        # Business logic
├── middleware/         # Request processing
├── models/            # Database schemas
├── routes/            # API endpoints
├── services/          # External services
└── app.js            # Application entry
```

### Why MVC?
- **Models**: Define data structure and database interactions
- **Controllers**: Handle business logic and request processing
- **Routes**: Define API endpoints and connect to controllers
- **Services**: Handle external integrations (like Razorpay)

## Setting Up the Project

### 1. Initialize Project
```bash
mkdir sofico-server
cd sofico-server
npm init -y
```

### 2. Install Core Dependencies
```bash
# Core dependencies
npm install express mongoose dotenv

# Authentication
npm install jsonwebtoken bcryptjs cookie-parser

# Security & Utilities
npm install cors helmet express-rate-limit

# Real-time & Payments
npm install socket.io razorpay

# Development
npm install nodemon --save-dev
```

### 3. Basic Express Setup (app.js)
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// Routes
app.use('/auth', authRoutes);
app.use('/wallet', walletRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
```

## Database Design

### MongoDB Connection (config/database.js)
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
```

### User Model (models/User.js)
```javascript
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // ... other fields
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});
```

### Wallet Model (models/Wallet.js)
```javascript
const walletSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    balance: { type: Number, default: 0 },
    transactions: [{
        type: { type: String, enum: ['CREDIT', 'DEBIT'] },
        amount: Number,
        description: String,
        timestamp: { type: Date, default: Date.now }
    }]
});
```

## Authentication System

### 1. JWT Middleware (middleware/auth.js)
```javascript
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('No token provided');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) throw new Error('User not found');

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication required' });
    }
};
```

### 2. Authentication Routes (routes/authRoutes.js)
```javascript
// Signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ user, token });
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) throw new Error('Invalid credentials');
    // ... generate token and send response
});
```

## Wallet System

### 1. Wallet Controller (controllers/walletController.js)
```javascript
class WalletController {
    // Get balance
    async getBalance(req, res) {
        const wallet = await Wallet.findOne({ userId: req.user._id });
        res.json({ balance: wallet.balance });
    }

    // Create payment order
    async createPaymentOrder(req, res) {
        const { amount } = req.body;
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: 'INR'
        });
        res.json({ orderId: order.id, amount, key: process.env.RAZORPAY_KEY_ID });
    }

    // Process payment
    async verifyPayment(req, res) {
        const { orderId, paymentId, signature } = req.body;
        // Verify signature and update wallet
        // ... implementation
    }
}
```

### 2. Wallet Routes (routes/walletRoutes.js)
```javascript
router.get('/balance', auth, walletController.getBalance);
router.post('/payment/create-order', auth, walletController.createPaymentOrder);
router.post('/payment/verify', auth, walletController.verifyPayment);
```

## Payment Integration

### 1. Razorpay Setup (config/razorpay.js)
```javascript
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
```

### 2. Payment Flow
1. **Create Order**
   ```javascript
   // Client requests payment
   POST /wallet/payment/create-order
   { "amount": 1000 }
   
   // Server creates Razorpay order
   const order = await razorpay.orders.create({
       amount: 1000 * 100,
       currency: 'INR'
   });
   ```

2. **Process Payment**
   ```javascript
   // Client completes payment
   POST /wallet/payment/verify
   {
       "orderId": "order_xxx",
       "paymentId": "pay_xxx",
       "signature": "xxx"
   }
   
   // Server verifies and processes
   const isValid = verifySignature(orderId, paymentId, signature);
   if (isValid) {
       await updateWallet(userId, amount);
   }
   ```

## Real-time Updates

### Socket.IO Setup (app.js)
```javascript
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('Client connected');
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
```

### Real-time Wallet Updates
```javascript
// In wallet controller
async processPayment(req, res) {
    // ... process payment
    const wallet = await updateWallet(userId, amount);
    
    // Emit real-time update
    req.app.get('io').emit('walletUpdate', {
        userId,
        balance: wallet.balance,
        transaction: wallet.transactions[wallet.transactions.length - 1]
    });
}

// Client-side
const socket = io('http://localhost:3000');
socket.on('walletUpdate', (data) => {
    updateUI(data);
});
```

## Security Best Practices

### 1. Environment Variables (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sofico
JWT_SECRET=your-secure-secret
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret
```

### 2. Security Middleware
```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

// Security headers
const helmet = require('helmet');
app.use(helmet());
```

### 3. Input Validation
```javascript
const { body, validationResult } = require('express-validator');

router.post('/signup', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // ... proceed with signup
});
```

## Testing and Deployment

### 1. API Testing (using Postman or similar)
```javascript
// Example test cases
describe('Wallet API', () => {
    it('should create payment order', async () => {
        const res = await request(app)
            .post('/wallet/payment/create-order')
            .send({ amount: 1000 });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('orderId');
    });
});
```

### 2. Deployment Checklist
- [ ] Set up production environment variables
- [ ] Configure MongoDB Atlas
- [ ] Set up SSL/TLS
- [ ] Configure CORS for production
- [ ] Set up logging and monitoring
- [ ] Configure backup strategy

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with required variables
4. Start MongoDB locally or use MongoDB Atlas
5. Run development server: `npm run test`

## 📝 Common Issues and Solutions

1. **MongoDB Connection Issues**
   - Check if MongoDB is running
   - Verify connection string in .env
   - Check network connectivity

2. **Authentication Errors**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Ensure proper cookie settings

3. **Payment Processing Issues**
   - Verify Razorpay credentials
   - Check webhook configurations
   - Verify signature generation

## 🔍 Learning Resources

1. **Node.js & Express**
   - [Express.js Documentation](https://expressjs.com/)
   - [Node.js Documentation](https://nodejs.org/docs/)

2. **MongoDB & Mongoose**
   - [MongoDB University](https://university.mongodb.com/)
   - [Mongoose Documentation](https://mongoosejs.com/docs/)

3. **Authentication & Security**
   - [JWT.io](https://jwt.io/)
   - [OWASP Security Cheat Sheet](https://cheatsheetseries.owasp.org/)

4. **Payment Integration**
   - [Razorpay Documentation](https://razorpay.com/docs/)
   - [Payment Gateway Best Practices](https://stripe.com/guides/payment-gateway-best-practices)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Ramesh Vishwakarma
- Abhishek Raj

Remember: This is a learning guide. Always follow security best practices and thoroughly test your implementation before deploying to production. 