const mongoose = require('mongoose');

const connectDB = async () => {
    const maxRetries = 5;
    let retryCount = 0;

    const connectWithRetry = async () => {
        try {
            // Set global mongoose options
            mongoose.set('bufferCommands', false); // Disable command buffering
            mongoose.set('strictQuery', true); // Enable strict query mode

            const conn = await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 30000, // Increase to 30s for initial connection
                socketTimeoutMS: 45000,
                family: 4,
                maxPoolSize: 50, // Increase pool size
                minPoolSize: 10, // Increase minimum connections
                maxIdleTimeMS: 30000, // Reduce idle time
                connectTimeoutMS: 30000, // Increase connection timeout
                heartbeatFrequencyMS: 5000, // More frequent heartbeat
                retryWrites: true,
                retryReads: true,
                w: 'majority', // Write concern
                wtimeoutMS: 2500, // Write timeout
                readPreference: 'primary', // Read from primary
                compressors: 'zlib', // Enable compression
                zlibCompressionLevel: 9, // Maximum compression
            });

            console.log(`MongoDB Connected: ${conn.connection.host}`);

            // Handle connection errors after initial connection
            mongoose.connection.on('error', (err) => {
                console.error('MongoDB connection error:', err);
                if (err.name === 'MongoServerSelectionError' || err.name === 'MongoNetworkError') {
                    console.log('Attempting to reconnect...');
                    mongoose.connection.close().then(() => {
                        setTimeout(connectWithRetry, 5000);
                    });
                }
            });

            mongoose.connection.on('disconnected', () => {
                console.log('MongoDB disconnected. Attempting to reconnect...');
                mongoose.connection.close().then(() => {
                    setTimeout(connectWithRetry, 5000);
                });
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

            // Add connection success handler
            mongoose.connection.on('connected', () => {
                console.log('MongoDB connection established successfully');
                retryCount = 0; // Reset retry count on successful connection
            });

        } catch (error) {
            retryCount++;
            console.error(`MongoDB connection attempt ${retryCount} failed:`, error.message);
            
            if (retryCount < maxRetries) {
                const delay = Math.min(1000 * Math.pow(2, retryCount), 10000); // Exponential backoff
                console.log(`Retrying connection in ${delay/1000} seconds... (Attempt ${retryCount + 1}/${maxRetries})`);
                setTimeout(connectWithRetry, delay);
            } else {
                console.error('Max retries reached. Could not connect to MongoDB.');
                process.exit(1);
            }
        }
    };

    // Clear any existing connections before connecting
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }

    await connectWithRetry();
};

module.exports = connectDB; 