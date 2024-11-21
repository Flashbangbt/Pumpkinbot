import { CommandInteraction, CacheType, SlashCommandBuilder, Client } from 'discord.js';  // Import Client for Discord.js v14
import { deleteCommandGroup } from '../sql/Database';  // Import the delete function

// Register the /cmdgroup-delete command
export const registerCmdGroupDelete = async (client: Client) => {
  const commands = [
    new SlashCommandBuilder()
      .setName('cmdgroup-delete')
      .setDescription('Delete a command group')
      .addStringOption(option =>
        option.setName('name')
          .setDescription('The name of the command group to delete')
          .setRequired(true))
  ];

  try {
    // Register the command with the application commands
    await client.application?.commands.set(commands);  // Use the application commands manager
    console.log('cmdgroup-delete command registered successfully.');
  } catch (error) {
    console.error('Error registering cmdgroup-delete command:', error);
  }
};

// Handle the /cmdgroup-delete command interaction
export const handleCmdGroupDelete = async (interaction: CommandInteraction<CacheType>) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'cmdgroup-delete') {
    // Correct way to access string options in v14
    const groupName = options.get('name')?.value as string;  // Use .get('name') and cast the value to string

    if (!groupName) {
      await interaction.reply('Command group name is required!');
      return;
    }

    try {
      // Call the delete function from the database
      await deleteCommandGroup(groupName); 
      await interaction.reply(`Command group "${groupName}" deleted successfully.`);
    } catch (error) {
      console.error('Error handling cmdgroup-delete command:', error);
      await interaction.reply('There was an error while deleting the command group.');
    }
  }
};
