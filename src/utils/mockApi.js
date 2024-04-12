import mockData from '../mock-data/playerStats.json'; // Adjust path as necessary

export const fetchMockPlayerStats = async (playerId) => {
    // Simulate a network call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const player = mockData.find(p => p.playerId === playerId);
            if (player) {
                resolve(player);
            } else {
                reject(new Error("Player not found"));
            }
        }, 1000);
    });
};
