import React, { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');  // Add state for email

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email })  // Include email in the payload
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Success:', data);
                // Redirect user or show success message
                // Possible redirection: window.location = '/login';
            } else {
                throw new Error(data.message); // Handling backend errors
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;