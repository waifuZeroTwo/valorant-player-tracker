import React from 'react';
import './CSS/ErrorStyles.css';

const Home = ({ playerData, loading, error }) => {
    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <div className="error-message">{error}</div>}
            {playerData && (
                <div>
                    <h1>{playerData.nickname}</h1>
                    <p>Rank: {playerData.rank}</p>
                    {/* Render more player details here */}
                </div>
            )}
            {!loading && !playerData && !error && (
                <p>Enter a player ID in the search bar to view stats.</p>
            )}
        </div>
    );
};

export default Home;
