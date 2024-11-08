import { CommandInteraction, CacheType } from 'discord.js';
import { RCEManager } from 'rce.js';

export const sayCommand = async (interaction: CommandInteraction<CacheType>, rce: RCEManager, serverId: string) => {
    const message = interaction.options.get('message')?.value as string;
    if (!message) {
        await interaction.reply("No message provided!");
        return;
    }
    const response = await rce.servers.command(serverId, `say ${message}`);
    await interaction.reply(`Message sent to the server: ${message}`);
};
