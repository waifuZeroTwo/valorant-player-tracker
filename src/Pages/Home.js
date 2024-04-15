import React, { useState } from 'react';
import './CSS/HomePage.css';
import './CSS/MobileCSS/HomePage_Mobile.css';

const Home = ({ playerData, loading, error }) => {
    const [view, setView] = useState('');

    return (
        <div className="home-content">
            {loading && <p>Loading...</p>}
            {error && <div className="error-message">{error}</div>}
            {playerData && (
                <div>
                    <h1>{playerData.nickname}</h1>
                    <p>Rank: {playerData.rank}</p>
                    <div>
                        <button onClick={() => setView('topAgents')}>Top Agents</button>
                        <button onClick={() => setView('bottomMaps')}>Worst Maps</button>
                        <button onClick={() => setView('topMaps')}>Top Maps</button>
                        <button onClick={() => setView('weapons')}>Most Used Weapons</button>
                    </div>

                    {
                        view === 'topAgents' && (
                            <div className="player-info">
                                <h2>Top Agents</h2>
                                <ul>
                                    {playerData.topAgents.map(agent => (
                                        <li key={agent.agentName}>{agent.agentName} - Win%: {agent.winPercentage}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }

                    {
                        view === 'bottomMaps' && (
                            <div className="player-info">
                                <h2>Worst Maps</h2>
                                <ul>
                                    {playerData.bottomMaps.map(map => (
                                        <li key={map.mapName}>{map.mapName} - Win%: {map.winPercentage}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }

                    {
                        view === 'topMaps' && (
                            <div className="player-info">
                                <h2>Top Maps</h2>
                                <ul>
                                    {playerData.topMaps.map(map => (
                                        <li key={map.mapName}>{map.mapName} - Win%: {map.winPercentage}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }

                    {
                        view === 'weapons' && (
                            <div className="player-info">
                                <h2>Most Used Weapons</h2>
                                <ul>
                                    {playerData.mostUsedWeapons.map(weapon => (
                                        <li key={weapon.weaponName}>{weapon.weaponName} - Times Used: {weapon.timesUsed}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                </div>
            )}
            {!loading && !playerData && !error && (
                <p>Enter a player ID in the search bar to view stats.</p>
            )}
        </div>
    );
};

export default Home;
