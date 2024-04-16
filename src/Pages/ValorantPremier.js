import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/ValorantPremier.css'; // Ensure CSS path is correct

function ValorantPremier() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get('https://vlrggapi.vercel.app/match/upcoming');
                if (data.status === 200) {
                    setEvents(data.segments);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (err) {
                setError('Failed to load events');
                console.error('API fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="valorant-premier-container">
            <h1>Valorant Premier Events</h1>
            <p>Stay updated with the latest Valorant premier events and tournaments!</p>
            {loading && <p>Loading events...</p>}
            {error && <p>Error: {error}</p>}
            <div className="events-list">
                {events.map(event => (
                    <div key={event.tournament_name} className="event">
                        <h3>{event.tournament_name}</h3>
                        <p>Date: {new Date(event.unix_timestamp * 1000).toLocaleDateString()}</p>
                        <p>{event.round_info}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ValorantPremier;