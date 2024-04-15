import React from 'react';
import '../Pages/CSS/HomePage.css'; // Adjust the relative path as necessary

const ErrorComponent = ({ message }) => {
    return (
        <div className="error-message">{message}</div>
    );
};

export default ErrorComponent;