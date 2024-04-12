import axios from 'axios';

// Assuming your Riot API Key is stored as an environment variable for security reasons
// Make sure to include your API key in your environment configuration but never in your code directly
const API_KEY = process.env.RIOT_API_KEY;  // Use REACT_APP_ prefix for create-react-app environments
const BASE_URL = 'https://api.riotgames.com/valorant/'; // Update this if there's a more specific base URL

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
        throw error; // It's usually better to handle these errors in the component where the function is called
    }
};