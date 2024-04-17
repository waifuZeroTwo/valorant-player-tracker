import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/ValorantPremier.css';
import './CSS/MobileCSS/ValorantPremier_Mobile.css';

function ValorantPremier() {
    const [currentView, setCurrentView] = useState('matches'); // Default view
    const [events, setEvents] = useState([]);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null); // State to handle the selected event

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/https://vlrggapi.vercel.app/match/upcoming');
            const { data } = response;
            if (data.data.status === 200) {
                setEvents(data.data.segments);
            } else {
                throw new Error('Failed to fetch matches');
            }
        } catch (err) {
            setError('Failed to load matches');
            console.error('API fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/https://vlrggapi.vercel.app/news');
            const { data } = response;
            if (data.data.status === 200) {
                setNews(data.data.segments);
            } else {
                throw new Error('Failed to fetch news');
            }
        } catch (err) {
            setError('Failed to load news');
            console.error('API fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleNavClick = (view) => {
        setError(null); // Reset errors on view change
        setCurrentView(view);
        if (view === 'news' && news.length === 0) {
            fetchNews(); // Fetch news only if it hasn't been fetched yet
        }
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    return (
        <div className="valorant-premier-container">
            <h1>Valorant Premier Events</h1>
            <div className="nav-buttons">
                <button onClick={() => handleNavClick('matches')}>Matches</button>
                <button onClick={() => handleNavClick('news')}>News</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {currentView === 'matches' && (
                <div className="events-list">
                    {events.map(event => (
                        <div key={event.tournament_name} className="event" onClick={() => handleEventClick(event)}>
                            <h3>{event.tournament_name}</h3>
                            <p>Date: {new Date(event.unix_timestamp * 1000).toLocaleDateString()}</p>
                            <p>
                                <img src={`/src/Flags/${event.flag1}.png`} alt={`${event.team1} flag`}
                                     style={{width: '20px', height: '20px'}}/>
                                {event.team1} vs
                                <img src={`/src/Flags/${event.flag2}.png`} alt={`${event.team2} flag`}
                                     style={{width: '20px', height: '20px'}}/>
                                {event.team2}
                            </p>
                            <p>Score: {event.score1} - {event.score2}</p>
                            <p>{event.round_info}</p>
                        </div>
                    ))}
                </div>
            )}

            {currentView === 'news' && (
                <div className="news-list">
                    {news.map(item => (
                        <div key={item.url_path}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p>Date: {item.date}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Optionally render the selected event in a modal or overlay */}
            {selectedEvent && (
                <div className="event-details">
                    {/* Modal content here */}
                    <p>{selectedEvent.round_info}</p>
                    <button onClick={() => setSelectedEvent(null)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default ValorantPremier;