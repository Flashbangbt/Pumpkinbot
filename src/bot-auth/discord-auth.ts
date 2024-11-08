// src/bot-auth/bot-auth.ts
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export function initializeBot() {
  // Create a new Discord client with required intents
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  });

  // Log in to Discord with the bot token from the environment
  client.login(process.env.BOT_TOKEN)
    .then(() => console.log('Bot logged in successfully'))
    .catch(err => console.error('Error logging in to Discord:', err));

  return client;
}
