import { CommandInteraction, CacheType, SlashCommandBuilder, Client } from 'discord.js';
import { insertCommandGroup } from '../sql/Database';

export const registerCmdGroupAdd = async (client: Client) => {
  if (!client.application) {
    console.error('No application manager found.');
    return;
  }

  const commands = [
    new SlashCommandBuilder()
      .setName('cmdgroup-add')
      .setDescription('Add a new command group')
      .addStringOption(option =>
        option.setName('group')
          .setDescription('The name of the command group')
          .setRequired(true))
  ];

  try {
    await client.application.commands.set(commands);  // Access commands safely
    console.log('cmdgroup-add command registered successfully.');
  } catch (error) {
    console.error('Error registering cmdgroup-add command:', error);
  }
};

export const handleCmdGroupAdd = async (interaction: CommandInteraction<CacheType>) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'cmdgroup-add') {
    const groupName = options.get('group')?.value as string;

    try {
      await insertCommandGroup(groupName);
      await interaction.reply(`Command group "${groupName}" added.`);
    } catch (error) {
      console.error('Error adding command group:', error);
      await interaction.reply('There was an error while adding the command group.');
    }
  }
};
