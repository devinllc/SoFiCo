const mongoose = require('mongoose');

// Validate MongoDB URI
const validateMongoURI = (uri) => {
    if (!uri) {
        throw new Error('MongoDB URI is not defined');
    }
    if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
        throw new Error('Invalid MongoDB URI: must start with mongodb:// or mongodb+srv://');
    }
    return uri;
};

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

// Cache the connection for serverless environments
let cachedConnection = null;

const connectDB = async () => {
    // If we have a cached connection in a serverless environment, return it
    if (cachedConnection) {
        return cachedConnection;
    }

    // If already connecting, return the existing promise
    if (isConnecting) {
        return connectionPromise;
    }

    // If already connected, return
    if (mongoose.connection.readyState === 1) {
        return Promise.resolve();
    }

    isConnecting = true;
    const maxRetries = 3; // Reduced retries for serverless
    let retryCount = 0;

    const connectWithRetry = async () => {
        try {
            // Validate MongoDB URI
            const mongoURI = validateMongoURI(process.env.MONGODB_URI);

            // Clear any existing connections
            if (mongoose.connection.readyState !== 0) {
                await mongoose.connection.close();
            }

            // Reset ready promise
            readyPromise = null;

            const conn = await mongoose.connect(mongoURI, {
                serverSelectionTimeoutMS: 10000, // Reduced timeout for serverless
                socketTimeoutMS: 20000, // Reduced timeout for serverless
                family: 4,
                maxPoolSize: 10, // Reduced pool size for serverless
                minPoolSize: 1, // Reduced min pool size for serverless
                maxIdleTimeMS: 10000, // Reduced idle time for serverless
                connectTimeoutMS: 10000, // Reduced timeout for serverless
                heartbeatFrequencyMS: 2000, // More frequent heartbeat
                retryWrites: true,
                retryReads: true,
                w: 'majority',
                wtimeoutMS: 2500,
                readPreference: 'primary',
                compressors: 'zlib',
                zlibCompressionLevel: 9,
                autoIndex: true,
                autoCreate: true,
                bufferCommands: false,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                authSource: 'admin'
            });

            console.log(`MongoDB Connected: ${conn.connection.host}`);
            isConnecting = false;
            retryCount = 0;

            // Cache the connection for serverless environments
            cachedConnection = conn;

            // Handle connection errors after initial connection
            mongoose.connection.on('error', async (err) => {
                console.error('MongoDB connection error:', err);
                cachedConnection = null; // Clear cache on error
                if (err.name === 'MongoServerSelectionError' || err.name === 'MongoNetworkError') {
                    console.log('Attempting to reconnect...');
                    try {
                        await mongoose.connection.close();
                        isConnecting = false;
                        readyPromise = null;
                        setTimeout(() => connectDB(), 2000); // Reduced delay for serverless
                    } catch (closeError) {
                        console.error('Error closing connection:', closeError);
                    }
                }
            });

            mongoose.connection.on('disconnected', async () => {
                console.log('MongoDB disconnected. Attempting to reconnect...');
                cachedConnection = null; // Clear cache on disconnect
                try {
                    await mongoose.connection.close();
                    isConnecting = false;
                    readyPromise = null;
                    setTimeout(() => connectDB(), 2000); // Reduced delay for serverless
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
            cachedConnection = null; // Clear cache on error
            
            if (retryCount < maxRetries) {
                const delay = Math.min(1000 * Math.pow(2, retryCount), 5000); // Reduced max delay for serverless
                console.log(`Retrying connection in ${delay/1000} seconds... (Attempt ${retryCount + 1}/${maxRetries})`);
                isConnecting = false;
                readyPromise = null;
                return new Promise(resolve => {
                    setTimeout(() => {
                        connectWithRetry().then(resolve);
                    }, delay);
                });
            } else {
                console.error('Max retries reached. Could not connect to MongoDB.');
                isConnecting = false;
                readyPromise = null;
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