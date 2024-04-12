const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: { // Optional: add email if needed
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true, // Optional: if you want to record createdAt and updatedAt automatically
    collection: 'Accounts-Valorant' // Specify the collection name
});

const User = mongoose.model('User', userSchema);

module.exports = User;
