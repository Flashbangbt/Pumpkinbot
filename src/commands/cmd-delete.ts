import { CommandInteraction, ApplicationCommandOptionType, ApplicationCommandOptionData } from 'discord.js';
import { deleteCommandFromGroup } from '../sql/sql/Database'; // Fixed import path

const cmdDelete = {
  name: 'cmd-delete', // Name of the command
  description: 'Delete a command from a command group.',

  // Command execution logic
  async execute(interaction: CommandInteraction) {
    const groupName = interaction.options.get('name')?.value as string; // Get the group name from the interaction

    if (!groupName) {
      await interaction.reply('Command group name is required!');
      return;
    }

    try {
      // Call the function to delete the command from the selected group
      await deleteCommandFromGroup(groupName);
      await interaction.reply(`Command was removed from "${groupName}" successfully.`);
    } catch (error) {
      console.error('Error handling cmd-delete command:', error);
      await interaction.reply('There was an error while deleting the command.');
    }
  },

  // Command registration details
  registerCommand() {
    const options: ApplicationCommandOptionData[] = [
      {
        type: ApplicationCommandOptionType.String,
        name: 'name', // Name of the group to delete
        description: 'Name of the command group to delete.',
        required: true,
      },
    ];

    return {
      name: 'cmd-delete', // Command name
      description: 'Delete a command from a group.',
      options, // Command options
    };
  },
};

export default cmdDelete;
