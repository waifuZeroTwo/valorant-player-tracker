// db.js
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;

let mongoClient = null;

const connectDB = async () => {
    if (mongoClient && mongoClient.isConnected()) {
        console.log('Using existing database connection');
        return mongoClient;
    } else {
        try {
            mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            await mongoClient.connect();
            console.log('MongoDB connected successfully.');
            return mongoClient;
        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw error;
        }
    }
};

const getDB = () => {
    if (!mongoClient) {
        throw new Error("MongoDB client not initialized");
    }
    return mongoClient.db('Valorant-Tracker'); // replace 'Valorant-Tracker' with your database name if different
};

module.exports = { connectDB, getDB };