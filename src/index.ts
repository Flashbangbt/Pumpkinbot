import { CommandInteraction } from 'discord.js';
import { handleZoneEmote } from './dccommands/zoneCommands';
import { initializeRceManager } from './config/serverConfig';
import { RCEManager } from 'rce.js';

async function startBot() {
  const rce = await initializeRceManager();  // Initialize the RCE Manager

  // Handle Discord commands
  rce.on('Command', async (command: CommandInteraction) => {
    const { interaction } = command;
    const message = interaction.options.getString('message');
    const playerName = interaction.options.getString('player') || '';
    const zoneSize = interaction.options.getString('size') || 'small';
    const serverId = '7041651'; // Example server ID

    // Handle zone-related commands
    if (message && message.includes("zone")) {
      await handleZoneEmote(interaction, rce, serverId, playerName, message);
    }
  });
}

startBot();
