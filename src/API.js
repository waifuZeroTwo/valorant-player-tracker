import axios from 'axios';

const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const BASE_URL = 'https://api.riotgames.com/valorant/'; // This is a placeholder URL

// Axios instance for Riot Games API
const riotApi = axios.create({
    baseURL: BASE_URL,
    headers: { 'X-Riot-Token': API_KEY }
});

export const fetchPlayerStats = async (playerId) => {
    try {
        const response = await riotApi.get(`v1/players/${playerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching player stats:', error);
        throw error; // Rethrow or handle as needed
    }
};