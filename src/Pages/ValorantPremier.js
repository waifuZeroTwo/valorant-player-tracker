import React from 'react';
import './CSS/ValorantPremier.css'; // Ensure you have corresponding CSS file for styling

// Dummy data for premier events
const premierEvents = [
    {
        id: 1,
        title: "VCT Masters Reykjavik",
        date: "2024-04-23",
        description: "The pinnacle of Valorant competitive play, held in the land of fire and ice."
    },
    // ... more events
];

function ValorantPremier() {
    // Handler function when an event is clicked
    const handleEventClick = (event) => {
        console.log("Event clicked:", event.title);
        // Additional logic here, like redirecting to an event details page
    };
    return (
        <div className="valorant-premier-container">
            <h1>Valorant Premier Events</h1>
            <p>Stay updated with the latest Valorant premier events and tournaments!</p>

            <section className="valorant-premier-scout">
                <h2>Valorant Premier Scout</h2>
                <p>We have full Valorant Premier Tracking, starting with the Beta! Check out all of our features to
                    track your Valorant Premier stats, scout other teams, and achieve victory.</p>
                {/* Additional content and functionality */}
            </section>

            <section className="valorant-premier-team-search">
                <h2>Valorant Premier Team Search</h2>
                <p>Use the search box to scout for your Valorant Premier team or your opponents to craft your
                    strategy.</p>
                {/* Search functionality */}
            </section>

            <section className="valorant-premier-schedule">
                <h2>Valorant Premier Schedule</h2>
                <p>Find out when the next matches are scheduled and never miss a fight!</p>
                {/* Calendar or list of upcoming matches */}
            </section>

            <section className="valorant-premier-events">
                <h2>Upcoming Events</h2>
                <div className="events-list">
                    {premierEvents.map(event => (
                        <div key={event.id} className="event" onClick={() => handleEventClick(event)}>
                            <h3>{event.title}</h3>
                            <p>Date: {event.date}</p>
                            <p>{event.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default ValorantPremier;