import React, {useState} from 'react';
import './App.css';
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet"/>

function App() {
  const [playerName, setPlayerName] = useState('');
  const [playerStats, setPlayerStats] = useState(null);

  // Function to handle search submissions
  const handleSearch = async (name) => {
    setPlayerName(name);
  };

  return (
      <div className="App">
        <header className="App-header">
          <h1>Valorant Stat Tracker</h1>
        </header>
        <main>
          {}
          <div>
            {}
            <input
                type="text"
                placeholder="Enter Player Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />
            <button onClick={() => handleSearch(playerName)}>Search</button>
          </div>
          <div>
            {}
            {playerStats ? (
                <div>
                  {}
                  <p>Player Stats for: {playerName}</p>
                  {}
                </div>
            ) : (
                <p>Enter a player name to see stats.</p>
            )}
          </div>
        </main>
      </div>
  );
}

export default App;