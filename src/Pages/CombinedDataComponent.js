// CombinedDataComponent.js
import axios from 'axios';

const baseURL = 'http://localhost:8080/https://vlrggapi.vercel.app';

export const fetchMatches = async () => {
    try {
        const response = await axios.get(`${baseURL}/match/upcoming`);
        if (response.data.data.status === 200) {
            return response.data.data.segments;
        } else {
            throw new Error('Failed to fetch matches');
        }
    } catch (err) {
        console.error('API fetch error:', err);
        throw err;
    }
};

export const fetchLiveMatches = async () => {
    try {
        const response = await axios.get(`${baseURL}/match/live_score`);
        if (response.data.data.status === 200) {
            return response.data.data.segments;
        } else {
            throw new Error('Failed to fetch live matches');
        }
    } catch (err) {
        console.error('API fetch error:', err);
        throw err;
    }
};

export const fetchNews = async () => {
    try {
        const response = await axios.get(`${baseURL}/news`);
        if (response.data.data.status === 200) {
            return response.data.data.segments;
        } else {
            throw new Error('Failed to fetch news');
        }
    } catch (err) {
        console.error('API fetch error:', err);
        throw err;
    }
};

export const getTimeUntil = (unixTimestamp) => {
    const eventDate = new Date(unixTimestamp * 1000);
    const now = new Date();
    const diffTime = eventDate - now; // Removing Math.max to see negative values too

    console.log(`Event Date: ${eventDate}`);
    console.log(`Current Date: ${now}`);
    console.log(`Difference in Time (ms): ${diffTime}`);

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

    console.log(`Days: ${diffDays}, Hours: ${diffHours}, Minutes: ${diffMinutes}`);

    if (diffDays > 0) {
        return `${diffDays} days, ${diffHours} hours, ${diffMinutes} minutes`;
    } else if (diffHours > 0) {
        return `${diffHours} hours, ${diffMinutes} minutes`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes} minutes`;
    } else if (diffTime > 0) {
        return "Starting soon!";
    } else {
        return "Match has started or time data is invalid";
    }
};