import React from 'react';
import './CSS/Login.css';  // Ensure this path is correct

function Login() {
    const handleLogin = () => {
        // Redirect users to Riot's OAuth service
        window.location.href = `http://localhost:5000/api/auth/login/riot`;
    };

    return (
        <div className="login-container">
            <h1>Login with Riot Games</h1>
            <button onClick={handleLogin} className="login-button">Log In with Riot Games</button>
        </div>
    );
}

export default Login;