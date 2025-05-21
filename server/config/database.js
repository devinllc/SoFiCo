const mongoose = require('mongoose');

// Disable command buffering globally
mongoose.set('bufferCommands', false);
mongoose.set('strictQuery', true);

// Track connection state
let isConnecting = false;
let connectionPromise = null;
let readyPromise = null;

// Create a promise that resolves when the connection is ready
const getReadyPromise = () => {
    if (!readyPromise) {
        readyPromise = new Promise((resolve, reject) => {
            if (mongoose.connection.readyState === 1) {
                resolve();
            } else {
                mongoose.connection.once('connected', () => {
                    resolve();
                });
                mongoose.connection.once('error', (err) => {
                    reject(err);
                });
            }
        });
    }
    return readyPromise;
};

const connectDB = async () => {
    // If already connecting, return the existing promise
    if (isConnecting) {
        return connectionPromise;
    }

    // If already connected, return
    if (mongoose.connection.readyState === 1) {
        return Promise.resolve();
    }

    isConnecting = true;
    const maxRetries = 5;
    let retryCount = 0;

    const connectWithRetry = async () => {
        try {
            // Clear any existing connections
            if (mongoose.connection.readyState !== 0) {
                await mongoose.connection.close();
            }

            // Reset ready promise
            readyPromise = null;

            const conn = await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 30000,
                socketTimeoutMS: 45000,
                family: 4,
                maxPoolSize: 50,
                minPoolSize: 10,
                maxIdleTimeMS: 30000,
                connectTimeoutMS: 30000,
                heartbeatFrequencyMS: 5000,
                retryWrites: true,
                retryReads: true,
                w: 'majority',
                wtimeoutMS: 2500,
                readPreference: 'primary',
                compressors: 'zlib',
                zlibCompressionLevel: 9,
                // Add these options to prevent buffering
                bufferMaxEntries: 0,
                autoIndex: true,
                autoCreate: true,
            });

            console.log(`MongoDB Connected: ${conn.connection.host}`);
            isConnecting = false;
            retryCount = 0;

            // Handle connection errors after initial connection
            mongoose.connection.on('error', async (err) => {
                console.error('MongoDB connection error:', err);
                if (err.name === 'MongoServerSelectionError' || err.name === 'MongoNetworkError') {
                    console.log('Attempting to reconnect...');
                    try {
                        await mongoose.connection.close();
                        isConnecting = false;
                        readyPromise = null; // Reset ready promise on error
                        setTimeout(() => connectDB(), 5000);
                    } catch (closeError) {
                        console.error('Error closing connection:', closeError);
                    }
                }
            });

            mongoose.connection.on('disconnected', async () => {
                console.log('MongoDB disconnected. Attempting to reconnect...');
                try {
                    await mongoose.connection.close();
                    isConnecting = false;
                    readyPromise = null; // Reset ready promise on disconnect
                    setTimeout(() => connectDB(), 5000);
                } catch (closeError) {
                    console.error('Error closing connection:', closeError);
                }
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
                isConnecting = false;
                retryCount = 0;
            });

            return conn;

        } catch (error) {
            retryCount++;
            console.error(`MongoDB connection attempt ${retryCount} failed:`, error.message);
            
            if (retryCount < maxRetries) {
                const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
                console.log(`Retrying connection in ${delay/1000} seconds... (Attempt ${retryCount + 1}/${maxRetries})`);
                isConnecting = false;
                readyPromise = null; // Reset ready promise on retry
                return new Promise(resolve => {
                    setTimeout(() => {
                        connectWithRetry().then(resolve);
                    }, delay);
                });
            } else {
                console.error('Max retries reached. Could not connect to MongoDB.');
                isConnecting = false;
                readyPromise = null; // Reset ready promise on failure
                throw error;
            }
        }
    };

    // Store the connection promise
    connectionPromise = connectWithRetry();
    return connectionPromise;
};

// Export both the connection function and the mongoose instance
module.exports = {
    connectDB,
    mongoose,
    getReadyPromise
}; 