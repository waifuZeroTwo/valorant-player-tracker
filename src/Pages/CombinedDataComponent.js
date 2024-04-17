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