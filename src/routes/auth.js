// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path as necessary

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log("Registering user:", username, password);  // Log the input data
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log("User created:", savedUser);  // Log the saved user
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: "Login error", error: error.message });
    }
});

module.exports = router;
