import React, { useState, useEffect } from 'react';
import { fetchMockPlayerStats } from '../utils/mockApi';

function PlayerProfile({ playerId }) {
    const [playerData, setPlayerData] = useState(null);

    useEffect(() => {
        fetchMockPlayerStats(playerId)
            .then(data => {
                setPlayerData(data);
            });
    }, [playerId]);

    return (
        <div>
            {playerData ? (
                <div>
                    <h1>{playerData.nickname}</h1>
                    <p>Rank: {playerData.rank}</p>
                    {/* Render more player details here */}
                </div>
            ) : (
                <p>Loading player data...</p>
            )}
        </div>
    );
}

export default PlayerProfile;