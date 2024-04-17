// ValorantPremier.js
import React, { useEffect, useState } from 'react';
import {fetchMatches, fetchLiveMatches, fetchNews, getTimeUntil} from './CombinedDataComponent';
import './CSS/ValorantPremier.css';
import './CSS/MobileCSS/ValorantPremier_Mobile.css';

function ValorantPremier() {
    const [currentView, setCurrentView] = useState('matches');
    const [events, setEvents] = useState([]);
    const [news, setNews] = useState([]);
    const [liveMatches, setLiveMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null); // State to handle the selected event

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const eventsData = await fetchMatches();
                const liveData = await fetchLiveMatches();
                const newsData = currentView === 'news' ? await fetchNews() : [];
                setEvents(eventsData);
                setLiveMatches(liveData);
                setNews(newsData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        loadData();
    }, [currentView]);

    const handleNavClick = async (view) => {
        setError(null);
        setCurrentView(view);
        if (view === 'news' && news.length === 0) {
            try {
                const newsData = await fetchNews();
                setNews(newsData);
            } catch (err) {
                setError(err.message);
            }
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

            {/* Live Matches Section */}
            {currentView === 'matches' && liveMatches.length > 0 && (
                <div className="live-matches">
                    <h2>Live Matches</h2>
                    {liveMatches.map(match => (
                        <div key={`${match.tournament_name}-live-${match.unix_timestamp}`} className="event live" onClick={() => handleEventClick(match)}>
                            <h3>{match.tournament_name} (Live)</h3>
                            <p>{match.team1} vs {match.team2}</p>
                            <p>Score: {match.score1} - {match.score2}</p>
                            <p>{match.round_info}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Upcoming Matches Section */}
            {currentView === 'matches' && (
                <div className="events-list">
                    <h2>Upcoming Matches</h2>
                    {events.map(event => {
                        const timeUntilMatch = getTimeUntil(event.unix_timestamp);

                        return (
                            <div key={`${event.tournament_name}-${event.unix_timestamp}`} className="event" onClick={() => handleEventClick(event)}>
                                <h3>{event.tournament_name}</h3>
                                <p>Time until match: {timeUntilMatch}</p>
                                <p>{event.team1} vs {event.team2}</p>
                                <p>{event.round_info}</p>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* News Section */}
            {currentView === 'news' && (
                <div className="news-list">
                    {news.map((item, index) => (
                        <div key={index} className="news-item" onClick={() => handleEventClick(item)}>
                            <h3>{item.title}</h3>
                        </div>
                    ))}
                </div>
            )}

            {/* News Details Overlay */}
            {selectedEvent && (
                <div className="event-details-overlay">
                    <div className="event-details">
                        <h3>{selectedEvent.title}</h3>
                        <p>{selectedEvent.description}</p>
                        <p>Date Published: {new Date(selectedEvent.date).toLocaleDateString()}</p>
                        <button onClick={() => setSelectedEvent(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ValorantPremier;