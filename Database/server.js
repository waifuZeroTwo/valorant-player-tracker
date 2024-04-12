const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const authRoutes = require('./routes/auth');  // Adjust the path as necessary
require('dotenv').config();

// Configure Passport for OAuth with Riot Games
passport.use(new OAuth2Strategy({
        authorizationURL: 'https://riotgames.com/oauth/authorize',  // Correct authorization URL from Riot
        tokenURL: 'https://riotgames.com/oauth/token',  // Correct token URL from Riot
        clientID: process.env.RIOT_CLIENT_ID,
        clientSecret: process.env.RIOT_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/auth/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        // Simplified example; adjust according to your user handling logic
        // Typically, here you would either create a new user in your DB or update an existing one
        return cb(null, profile);
    }));

const app = express();

// Initialize Passport
app.use(passport.initialize());

// Define routes
app.use('/api/auth', authRoutes);

// Set up other routes
// Home route for testing
app.get('/', (req, res) => {
    res.send('Home Page - Login Successful');
});

// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});