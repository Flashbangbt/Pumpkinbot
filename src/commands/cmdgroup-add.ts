import { CommandInteraction, CacheType, SlashCommandBuilder } from 'discord.js';
import { insertCommandGroup } from '../sql/sql/Database';

// Define the cmdgroup-add command structure
const cmdGroupAddCommand = {
  name: 'cmdgroup-add',
  description: 'Add a new command group.',

  async execute(interaction: CommandInteraction<CacheType>) {
    if (!interaction.isCommand()) return;

    const groupName = interaction.options.get('group')?.value?.toString().trim();

    console.log(`Executing 'cmdgroup-add' with group name: ${groupName}`);

    // Validate if group name is provided
    if (!groupName) {
      console.error('No group name provided in the command.');
      await interaction.reply('Command group name is required!');
      return;
    }

    try {
      // Attempt to insert the new command group into the database
      await insertCommandGroup(groupName);
      console.log(`Command group "${groupName}" added successfully.`);
      await interaction.reply(`Command group "${groupName}" has been successfully added.`);
    } catch (error: any) {
      // Handle database insertion errors
      console.error(`Error while inserting command group "${groupName}":`, error);

      if (error.message.includes('already exists')) {
        console.log(`The command group "${groupName}" already exists.`);
        await interaction.reply(`The command group "${groupName}" already exists. Please choose a different name.`);
      } else {
        console.error('Unexpected error:', error);
        await interaction.reply('There was an error while adding the command group. Please try again later.');
      }
    }
  },

  // Register the command with Discord
  registerCommand() {
    return new SlashCommandBuilder()
      .setName('cmdgroup-add')
      .setDescription('Add a new command group.')
      .addStringOption(option =>
        option.setName('group')
          .setDescription('The name of the group to add')
          .setRequired(true)
      )
      .toJSON(); // Return the command in JSON format for Discord API registration
  }
};

export default cmdGroupAddCommand;
