import React from 'react';

const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        onSearch(searchTerm);  // Call the onSearch function passed from Header, which triggers the API call in App.js
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter Player ID"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;