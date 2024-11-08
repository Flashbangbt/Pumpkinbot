import { CommandInteraction } from 'discord.js';
import { RCEManager } from 'rce.js';

export async function sendCommand(interaction: CommandInteraction, rce: RCEManager, serverId: string) {
  const playerName = interaction.options.getString('player');
  const command = interaction.options.getString('command');
  
  // Use RCEManager to send command
  const response = await rce.servers.command(serverId, `${command} "${playerName}"`);
  await interaction.reply(response);
}
