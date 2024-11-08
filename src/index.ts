import { Client, GatewayIntentBits, CommandInteraction } from 'discord.js'; // Correct import for intents
import { initializeRCE } from './gportal-auth/gportal-auth';  // Import RCE initialization
import { localDb } from './database/localDb';  // Importing local database
import { sayCommand } from './discord-commands/say';  // Importing Discord /say command
import { sendCmd } from './discord-commands/sendcmd';  // Importing /sendcmd command
import { cmdGroupTime } from './gportal-fun/cmdgrouptime';  // Importing /cmdgrouptime functionality
import { zoneLogic } from './gportal-zonelogic/zonelogic';  // Importing zone logic
import { runCommand } from './gportal-zonelogic/runCommand';  // Importing run command logic

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const serverId = '7041651';  // Your server ID, make sure it's correct
const rce = initializeRCE();  // Initialize RCE connection

client.on('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}`);
});

client.on('interactionCreate', async (interaction: CommandInteraction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'say') {
        await sayCommand(interaction, rce, serverId);
    } else if (interaction.commandName === 'sendcmd') {
        await sendCmd(interaction, rce, serverId);
    } else if (interaction.commandName === 'cmdgrouptime') {
        await cmdGroupTime(interaction);
    } else if (interaction.commandName === 'zonecreate') {
        await zoneLogic(interaction);
    } else if (interaction.commandName === 'runcommand') {
        await runCommand(interaction);
    }
});

client.login(process.env.BOT_TOKEN);  // Your Discord bot token here
