import { CommandInteraction, CacheType, SlashCommandBuilder, Client } from 'discord.js';
import { insertCommandGroup } from '../sql/Database'; // Correctly importing the database function

// Register the /cmdadd command
export const registerCmdAdd = async (client: Client) => {
  if (!client.application) {
    console.error('No application manager found.');
    return;
  }

  const commands = [
    new SlashCommandBuilder()
      .setName('cmdadd')
      .setDescription('Add a command to the specified group')
      .addStringOption(option =>
        option.setName('command')
          .setDescription('The command to add')
          .setRequired(true))
      .addStringOption(option =>
        option.setName('group')
          .setDescription('The command group')
          .setRequired(true)) // Add group option
  ];

  try {
    // Register the command with the application commands
    await client.application.commands.set(commands);
    console.log('cmdadd command registered successfully.');
  } catch (error) {
    console.error('Error registering cmdadd command:', error);
  }
};

// Handle the /cmdadd command interaction
export const handleCmdAdd = async (interaction: CommandInteraction<CacheType>) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'cmdadd') {
    // Use .get() to fetch command and group options
    const command = options.get('command')?.value as string;
    const group = options.get('group')?.value as string;

    if (!command || !group) {
      await interaction.reply('Please provide valid command and group names.');
      return;
    }

    try {
      // Insert the command group into the database
      await insertCommandGroup(group);  // Ensure you're inserting the group correctly
      await interaction.reply(`Command "${command}" added to group "${group}" successfully.`);
    } catch (error) {
      console.error('Error handling cmdadd command:', error);
      await interaction.reply('There was an error while adding the command.');
    }
  }
};
