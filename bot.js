// Import the Discord.js library for interacting with Discord's API
const Discord = require('discord.js');

// Import the getPlayerStats function from the nbaAPI.js file
const { getPlayerStats } = require('./nbaAPI');

// Create a new instance of the Discord Client
const client = new Discord.Client();

// Define a prefix for bot commands
const PREFIX = '!';

// Event handler when the bot is ready
client.once('ready', () => {
  console.log('Bot is online!'); // Log a message when the bot is ready
});

// Event handler for incoming messages
client.on('message', async (message) => {
  if (message.author.bot) return; // Ignore messages from other bots
  if (!message.content.startsWith(PREFIX)) return; // Ignore messages that don't start with the prefix

  const args = message.content.slice(PREFIX.length).trim().split(/ +/); // Split the message into command and arguments
  const command = args.shift().toLowerCase(); // Extract the command and convert to lowercase

  if (command === 'playerstats') {
    const playerName = args.join(' '); // Join the arguments to form the player's name

    try {
      // Call the getPlayerStats function to fetch player statistics and team
      const playerStats = await getPlayerStats(playerName);
      if (!playerStats) {
        message.channel.send('Player not found.'); // Send a message if player is not found
        return;
      }

      // Construct a formatted message with player statistics and team
      const statsMessage = `
        **${playerStats.player.first_name} ${playerStats.player.last_name}**
        Team: ${playerStats.team}
        Points per game: ${playerStats.stats.pts}
        Rebounds per game: ${playerStats.stats.reb}
        Assists per game: ${playerStats.stats.ast}
        Blocks per game: ${playerStats.stats.blk}
        Steals per game: ${playerStats.stats.stl}
        Field goal percentage: ${playerStats.stats.fg_pct}
        Free throw percentage: ${playerStats.stats.ft_pct}
        Three-point percentage: ${playerStats.stats.fg3_pct}
        // Add more stats here
      `;

      // Send the formatted message to the channel
      message.channel.send(statsMessage);
    } catch (error) {
      console.error('Error:', error); // Log an error if something goes wrong
      message.channel.send('An error occurred while fetching player stats.'); // Send an error message
    }
  }
});

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const TOKEN = 'MTE0NTc2NzQzOTEyMDk5NDQ3NQ.GKsyzX.iJer4EhEpNkndnPyfataM5DOEBUQh_TjLpg_tE';
client.login(TOKEN); // Log in to Discord using the bot's token
