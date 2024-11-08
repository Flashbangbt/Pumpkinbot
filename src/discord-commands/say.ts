import { CommandInteraction } from 'discord.js';

export async function say(interaction: CommandInteraction) {
  const message = interaction.options.getString('message');
  await interaction.reply(message);
}
