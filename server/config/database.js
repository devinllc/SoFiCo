const mongoose = require('mongoose');

const connectDB = async () => {
    const maxRetries = 5;
    let retryCount = 0;

    const connectWithRetry = async () => {
        try {
            const conn = await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
                socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
                family: 4, // Use IPv4, skip trying IPv6
                maxPoolSize: 10, // Maintain up to 10 socket connections
                minPoolSize: 5, // Maintain at least 5 socket connections
                maxIdleTimeMS: 60000, // Close idle connections after 60s
                connectTimeoutMS: 10000, // Give up initial connection after 10s
                heartbeatFrequencyMS: 10000, // Check server status every 10s
                retryWrites: true,
                retryReads: true,
            });

            console.log(`MongoDB Connected: ${conn.connection.host}`);

            // Handle connection errors after initial connection
            mongoose.connection.on('error', (err) => {
                console.error('MongoDB connection error:', err);
                if (err.name === 'MongoServerSelectionError') {
                    console.log('Attempting to reconnect...');
                    setTimeout(connectWithRetry, 5000);
                }
            });

            mongoose.connection.on('disconnected', () => {
                console.log('MongoDB disconnected. Attempting to reconnect...');
                setTimeout(connectWithRetry, 5000);
            });

            // Handle process termination
            process.on('SIGINT', async () => {
                try {
                    await mongoose.connection.close();
                    console.log('MongoDB connection closed through app termination');
                    process.exit(0);
                } catch (err) {
                    console.error('Error during MongoDB disconnection:', err);
                    process.exit(1);
                }
            });

        } catch (error) {
            retryCount++;
            console.error(`MongoDB connection attempt ${retryCount} failed:`, error.message);
            
            if (retryCount < maxRetries) {
                console.log(`Retrying connection in 5 seconds... (Attempt ${retryCount + 1}/${maxRetries})`);
                setTimeout(connectWithRetry, 5000);
            } else {
                console.error('Max retries reached. Could not connect to MongoDB.');
                process.exit(1);
            }
        }
    };

    await connectWithRetry();
};

module.exports = connectDB; 