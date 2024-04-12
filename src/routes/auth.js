const express = require('express');
const router = express.Router();
const passport = require('passport');

// Redirect to Riot Games for authentication
router.get('/login/riot', passport.authenticate('oauth2'));

// OAuth callback route handled by Passport
router.get('/callback',
    passport.authenticate('oauth2', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect to home or another secure page
        res.redirect('/secure');
    }
);

// Secure page route, only accessible after successful authentication
router.get('/secure', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Access to secure page granted.');
    } else {
        res.status(401).send('Access denied. Please login.');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();  // Passport logout function
    res.redirect('/');
});

module.exports = router;