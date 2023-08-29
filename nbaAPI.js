// Import the Axios library for making HTTP requests
const axios = require('axios');

// Define the base URL for the NBA API
const BASE_URL = 'https://www.balldontlie.io/api/v1/';

// Define an asynchronous function to fetch player statistics
async function getPlayerStats(playerName) {
  try {
    // Fetch player data using playerName as a search parameter
    const response = await axios.get(`${BASE_URL}players`, {
      params: {
        search: playerName,
      },
    });

    // Extract the player's ID from the API response
    const playerId = response.data.data[0].id;

    // Fetch player's season averages using the player's ID
    const statsResponse = await axios.get(`${BASE_URL}season_averages`, {
      params: {
        player_ids: playerId,
      },
    });

    // Fetch additional player information including the current team
    const playerResponse = await axios.get(`${BASE_URL}players/${playerId}`);
    const playerInfo = playerResponse.data;

    // Return an object containing both player statistics and team information
    return {
      stats: statsResponse.data.data[0],
      team: playerInfo.team.full_name,
    };
  } catch (error) {
    console.error('Error fetching player stats:', error);
    throw error;
  }
}

// Export the getPlayerStats function to make it available in other files
module.exports = {
  getPlayerStats,
};
