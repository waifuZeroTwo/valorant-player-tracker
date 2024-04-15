import React, { useState } from 'react';
import Select from 'react-select';
import playerStats from '../mock-data/playerStats.json';
import './CSS/Leaderboard.css'; // Ensure your CSS file is linked correctly
import './CSS/MobileCSS/Leaderboard_Mobile.css'

function Leaderboard() {
    const [season, setSeason] = useState(null);
    const [region, setRegion] = useState(null);
    const [sortKey, setSortKey] = useState('rank');
    const [ascending, setAscending] = useState(true);

    // Options for the React Select
    const seasonOptions = [
        { value: 'Episode 1 Act 1', label: 'Episode 1 Act 1' },
        { value: 'Episode 1 Act 2', label: 'Episode 1 Act 2' },
        { value: 'Episode 1 Act 3', label: 'Episode 1 Act 3' }
    ];
    const regionOptions = [
        { value: 'North America', label: 'North America' },
        { value: 'Europe', label: 'Europe' },
        { value: 'Asia', label: 'Asia' }
    ];

    // Custom styles for React Select
    const customStyles = {
        control: (provided) => ({
            ...provided,
            background: '#2a2d31',
            borderColor: '#673ab7',
            color: 'white',
            minHeight: '36px',
            height: '36px',
            cursor: 'pointer'
        }),
        menu: (provided) => ({
            ...provided,
            background: '#2a2d31',
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? '#fff' : '#ccc',
            background: state.isFocused ? '#424242' : '#2a2d31',
            cursor: 'pointer'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#fff',
        })
    };

    const handleSort = (key) => {
        if (key === sortKey) {
            setAscending(!ascending);
        } else {
            setSortKey(key);
            setAscending(true);
        }
    };

    const filteredPlayers = playerStats
        .filter(player => (!season || player.season === season.value) && (!region || player.region === region.value))
        .sort((a, b) => {
            const valA = a[sortKey];
            const valB = b[sortKey];
            return ascending ? (valA < valB ? -1 : 1) : (valA > valB ? -1 : 1);
        });

    return (
        <div className="leaderboard-container">
            <h1>Valorant Leaderboard</h1>
            <div className="filters">
                <Select
                    options={seasonOptions}
                    value={season}
                    onChange={setSeason}
                    styles={customStyles}
                    placeholder="Select Season/Act"
                />
                <Select
                    options={regionOptions}
                    value={region}
                    onChange={setRegion}
                    styles={customStyles}
                    placeholder="Select Region"
                />
            </div>
            <div style={{overflowX: 'auto'}}>
                <table>
                    <thead>
                    <tr>
                        <th onClick={() => handleSort('rank')}>Rank</th>
                        <th onClick={() => handleSort('nickname')}>Nickname</th>
                        <th onClick={() => handleSort('rankLevel')}>Rank Level</th>
                        <th onClick={() => handleSort('topAgent')}>Top Agent</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredPlayers.map((player, index) => (
                        <tr key={player.playerId}>
                            <td>{index + 1}</td>
                            <td>{player.nickname}</td>
                            <td>{player.rank}</td>
                            <td>{player.topAgents[0].agentName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Leaderboard;