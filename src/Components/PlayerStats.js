import React from 'react';

const PlayerStats = ({ playerData }) => {
    if (!playerData) return <p>No data available.</p>;

    return (
        <div>
            <h3>{playerData.name}</h3>
            {/* Example of data display */}
            <p>K/D Ratio: {playerData.kdRatio}</p>
            <p>Win Rate: {playerData.winRate}%</p>
            {/* Add more player stats as needed */}
        </div>
    );
};

export default PlayerStats;