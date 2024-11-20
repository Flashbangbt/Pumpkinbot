import 'dotenv/config'; // Load environment variables
import { Client, GatewayIntentBits } from 'discord.js'; // Import discord.js for client initialization
import { RCEManager, LogLevel, RCEIntent } from 'rce.js'; // Import RCE components
import { client, initializeCommands } from './utils/main'; // Correct import for initializeCommands

// Initialize the Discord client
const discordClient = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent 
  ] 
});

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user?.tag}`);
});

// Initialize the RCEManager
export const rce = new RCEManager();

async function initialize() {
  try {
    console.log('Initializing bot...');

    // Check for BOT_TOKEN
    if (!process.env.BOT_TOKEN) {
      console.error('BOT_TOKEN is not defined in the .env file.');
      process.exit(1);
    } else {
      console.log('BOT_TOKEN found in .env file.');
    }

    // Check for RCE credentials
    if (!process.env.RCE_USERNAME || !process.env.RCE_PASSWORD) {
      console.error('RCE_USERNAME or RCE_PASSWORD are not defined in the .env file.');
      process.exit(1);
    } else {
      console.log('RCE credentials found in .env file.');
    }

    // Initialize RCE
    console.log('Initializing RCE...');
    await rce.init(
      {
        username: process.env.RCE_USERNAME, // G-PORTAL username
        password: process.env.RCE_PASSWORD, // G-PORTAL password
      },
      {
        level: LogLevel.Info, // Log level
        file: 'rce.log', // Log file
      }
    );
    console.log('RCE Initialized successfully');

    // Add server to RCEManager
    console.log('Adding server to RCEManager...');
    await rce.servers.add({
      identifier: 'misfits',
      serverId: 7041651, // Replace with your actual server ID
      region: 'EU',
      intents: [RCEIntent.All],
      state: ['quads', '2x'],
    });
    console.log('Server added successfully.');

    // Verify server retrieval
    const server = rce.servers.get('misfits');
    if (server) {
      console.log('Server found:', server);
    } else {
      console.error('Server not found!');
    }

    // Initialize commands (from main.ts)
    console.log('Initializing commands...');
    await initializeCommands(discordClient); // Call the function to register commands

    // Log in to Discord
    console.log('Logging in to Discord...');
    await discordClient.login(process.env.BOT_TOKEN);
    console.log('Logged in to Discord successfully!');
  } catch (error) {
    console.error('Error initializing the bot:', error);
    process.exit(1); // Exit with error
  }
}

// Run the initialization
initialize();
