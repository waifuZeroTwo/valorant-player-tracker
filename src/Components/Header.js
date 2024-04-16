import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import './CSS/HeaderStyles.css';  // Ensure path is correct
import './CSS/MobileCSS/HeaderStyles_Mobile.css';  // Ensure path is correct

const Header = ({ onSearch, searchTerm, setSearchTerm }) => {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const navigate = useNavigate();

    const handleNavClick = (path) => {
        navigate(path);
        setIsNavVisible(false);  // Close the menu after navigation
    };

    return (
        <header className="header">
            <div className="logo">
                <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick('/'); }}>
                    Valorant Stat Tracker
                </a>
            </div>
            <button className="menu-toggle" onClick={() => setIsNavVisible(!isNavVisible)} aria-label="Menu">
                ☰
            </button>
            <nav className={`navigation ${isNavVisible ? 'visible' : ''}`}>
                <ul>
                    <li><button onClick={() => handleNavClick('/')}>Home</button></li>
                    <li><button onClick={() => handleNavClick('/leaderboard')}>Leaderboard</button></li>
                    <li><button onClick={() => handleNavClick('/valorant-premier')}>Valorant Premier</button></li>
                    <li><button onClick={() => handleNavClick('/login')}>Login</button></li>
                    <li><button onClick={() => handleNavClick('/register')}>Register</button></li>
                </ul>
            </nav>
            <SearchBar onSearch={onSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
    );
};

export default Header;