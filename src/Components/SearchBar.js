import React, { useState } from 'react';
import './CSS/SearchBar.css';
import './CSS/MobileCSS/SearchBar_Mobile.css';

const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
        if (window.innerWidth <= 375) {
            setIsVisible(false);  // Close overlay only on mobile after searching
        }
    };

    return (
        <>
            <div className="search-container">
                {isVisible && (
                    <div className={`search-overlay ${isVisible ? 'visible' : ''}`}>
                        <form onSubmit={handleSubmit} className="search-form">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Enter Player ID"
                                autoFocus
                            />
                            <div className="button-group">
                                <button type="submit" className="go-button">Go</button>
                                <button onClick={() => setIsVisible(false)} className="close-button">Close</button>
                            </div>
                        </form>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="desktop-search-form">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter Player ID"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>
            <button className="search-toggle" onClick={() => setIsVisible(true)}>
                Search
            </button>
        </>
    );
};

export default SearchBar;