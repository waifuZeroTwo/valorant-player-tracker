import React, { useState } from 'react';
import './CSS/Login.css';  // Make sure this path is correct

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/user/login', {  // Update the URL to match your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);
                // Redirect the user or handle login state here (e.g., set user context or local storage)
            } else {
                throw new Error(data.message || 'Failed to log in');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert(error.message); // Show error message to the user, adjust as needed for your UI
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="login-button">Log In</button>
            </form>
        </div>
    );
}

export default Login;