import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Leaderboard from './Pages/Leaderboard';
import ValorantPremier from './Pages/ValorantPremier';
import PlayerStats from './Components/PlayerStats';
import Loader from './Components/Loader';
import ErrorComponent from './Components/ErrorComponent';
import { fetchPlayerStats } from './API'; // Ensure the path is correct

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [playerData, setPlayerData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (searchTerm) => {
        setLoading(true);
        setError(''); // Clear previous errors
        try {
            const data = await fetchPlayerStats(searchTerm);
            setPlayerData(data); // Assuming you store fetched data here
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch player data'); // Set error message
            setLoading(false);
        }
    };

    return (
        <Router>
            <div className="App">
                <Header onSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Routes>
                    <Route path="/" element={<Home />} />
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