// Header.js
import React from 'react';
import SearchBar from './SearchBar'; // Assuming SearchBar is a separate component
import './CSS/HeaderStyles.css'; // Ensure you have corresponding CSS for styling

const Header = ({ onSearch, searchTerm, setSearchTerm }) => {
    return (
        <header className="header">
            <div className="logo">
                <a href="/">Valorant Stat Tracker</a>
            </div>
            <nav className="navigation">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/leaderboard">Leaderboard</a></li>
                    <li><a href="/valorant-premier">Valorant Premier</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
            <SearchBar onSearch={onSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
    );
};

export default Header;