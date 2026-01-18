const mongoose = require('mongoose');
// We require it, but if it's not installed yet, this file is fine until run.
// We'll wrap the require or assume install finishes before run.
let MongoMemoryServer;
try {
    MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
} catch (e) {
    // It might not be installed yet or not needed in prod
}

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;

        if (process.env.USE_MEMORY_DB === 'true') {
            if (!MongoMemoryServer) {
                console.error("mongodb-memory-server requested but not found.");
                process.exit(1);
            }
            const mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();
            console.log('Connected to In-Memory MongoDB');
        }

        await mongoose.connect(uri);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
