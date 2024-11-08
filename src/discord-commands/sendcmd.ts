import { CommandInteraction, CacheType } from 'discord.js';
import { RCEManager } from 'rce.js';

export const sendCmd = async (interaction: CommandInteraction<CacheType>, rce: RCEManager, serverId: string) => {
    const command = interaction.options.get('command')?.value as string;
    if (!command) {
        await interaction.reply("No command provided!");
        return;
    }
    const response = await rce.servers.command(serverId, command);
    await interaction.reply(`Command sent to the server: ${command}`);
};
