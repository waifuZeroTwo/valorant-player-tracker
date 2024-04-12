// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require('cors');  // Ensure cors is required if not already

// Import routes
const authRoutes = require('./src/routes/auth');  // Adjusted path to match new location

app.use(express.json());  // Middleware to parse JSON bodies
app.use(cors());  // Enable CORS

// MongoDB Connection Setup as a separate function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Optionally exit process if unable to connect
    }
};

connectDB();

// Use routes
app.use('/api/user', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});