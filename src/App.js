import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Leaderboard from './Pages/Leaderboard';
import ValorantPremier from './Pages/ValorantPremier';
import { fetchMockPlayerStats } from './utils/mockApi'; // Ensure the path is correct

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [playerData, setPlayerData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (searchTerm) => {
        if (!searchTerm) {
            setError('Please enter a valid player ID');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const data = await fetchMockPlayerStats(searchTerm);
            if (data) {
                setPlayerData(data);
                setLoading(false);
            } else {
                throw new Error("Player not found");  // Throwing an error if no data is found
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch player data');
            setPlayerData(null);
            setLoading(false);
        }
    };

    return (
        <Router>
            <div className="App">
                <Header onSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Routes>
                    <Route path="/" element={<Home playerData={playerData} loading={loading} error={error} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/valorant-premier" element={<ValorantPremier />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;