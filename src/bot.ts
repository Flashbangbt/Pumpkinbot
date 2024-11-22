
import { Client, GatewayIntentBits } from 'discord.js';
import { RCEManager, LogLevel, RCEIntent } from 'rce.js';
import { setupAllListeners } from './gp/main';
import { registerAllCommands, initializeCommands } from './utils/main';
import { sendPermissionsMessage } from './utils/sendPermissionsMessage';

const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ]
});

export const rce = new RCEManager();

async function initialize() {
    try {
        console.log('Initializing bot...');

        if (!process.env.BOT_TOKEN) {
            console.error('BOT_TOKEN is not defined in the .env file.');
            process.exit(1);
        }

        discordClient.once('ready', async () => {
            console.log(`Bot is ready! Logged in as ${discordClient.user?.tag}`);
            console.log('Registering commands...');
            await registerAllCommands(discordClient);
            console.log('Initializing command handlers...');
            await initializeCommands(discordClient);
            console.log('Commands are ready!');
            
            const channel = discordClient.channels.cache.get('1308880384360058971');
            if (channel?.isTextBased()) {
                await sendPermissionsMessage(discordClient, channel);
            }
        });

        console.log('Initializing RCE...');
        await rce.init(
            {
                username: process.env.RCE_USERNAME,
                password: process.env.RCE_PASSWORD,
            },
            {
                level: LogLevel.Info,
                file: 'rce.log',
            }
        );

        await rce.servers.add({
            identifier: 'misfits',
            serverId: 7041651,
            region: 'EU',
            intents: [RCEIntent.All],
            playerRefreshing: true,
            state: ['quads', '2x'],
        });

        const server = rce.servers.get('misfits');
        if (server) {
            console.log(`Server found: ${server.identifier}`);
            console.log(`Server status: ${server.status}`);
            console.log(`Players: ${server.players.length}`);
        }

        console.log('Setting up player event listeners...');
        await setupAllListeners();
        console.log('Player event listeners set up successfully.');

        await discordClient.login(process.env.BOT_TOKEN);
        console.log('Discord login successful!');

    } catch (error) {
        console.error('Error initializing the bot:', error);
        process.exit(1);
    }
}

initialize();

export const client = discordClient;
