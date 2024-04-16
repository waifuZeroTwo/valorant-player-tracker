import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/ValorantPremier.css'; // Ensure CSS path is correct

function ValorantPremier() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // State to hold the selected event
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/https://vlrggapi.vercel.app/match/upcoming');
                const { data } = response;
                if (data.data.status === 200) {
                    setEvents(data.data.segments);
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

    const handleEventClick = (event) => {
        setSelectedEvent(event); // Set the selected event for the modal
    };

    const closeModal = () => {
        setSelectedEvent(null); // Reset the selected event to close the modal
    };

    return (
        <div className="valorant-premier-container">
            <h1>Valorant Premier Events</h1>
            <p>Stay updated with the latest Valorant premier events and tournaments!</p>
            {loading && <p>Loading events...</p>}
            {error && <p>Error: {error}</p>}
            <div className="events-list">
                {events.map(event => (
                    <div key={event.tournament_name} className="event" onClick={() => handleEventClick(event)}>
                        <h3>{event.tournament_name}</h3>
                        <p>Date: {new Date(event.unix_timestamp * 1000).toLocaleDateString()}</p>
                        <p>{event.round_info}</p>
                    </div>
                ))}
            </div>
            {selectedEvent && (
                <div className="overlay">
                    <div className="modal">
                        <h2>{selectedEvent.tournament_name}</h2>
                        <p>Date: {new Date(selectedEvent.unix_timestamp * 1000).toLocaleDateString()}</p>
                        <p>Details: {selectedEvent.round_info}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ValorantPremier;