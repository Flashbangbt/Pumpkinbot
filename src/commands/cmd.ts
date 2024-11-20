import { CommandInteraction, ApplicationCommandOptionType, ApplicationCommandOptionData } from 'discord.js';
import { rce } from '../bot'; // Ensure this is correctly imported

const cmdCommand = {
  name: 'cmd',
  description: 'Send a command to G-Portal.',

  async execute(interaction: CommandInteraction) {
    // Get the text input from the user
    const text = interaction.options.get('text')?.value as string;
    
    console.log(`Received 'cmd' command from Discord: ${text}`);

    // Check if text was provided
    if (!text) {
      await interaction.reply('You didn\'t provide any text!');
      console.error('Text option is missing from interaction.');
      return;
    }

    // Send the command to the server
    console.log(`Sending command to G-Portal:${text}`);
    try {
      // Make sure to replace 'misfits' with your actual server name or ID if needed
      await rce.servers.command('misfits', `${text}`);
      console.log(`Command sent to G-Portal: ${text}`);

      // Send the response back to Discord
      await interaction.reply(`Command sent: "${text}"`);
      console.log(`Sent response back to Discord: Command sent: "${text}"`);
    } catch (error) {
      console.error('Error sending command to server:', error);
      await interaction.reply('There was an error processing your command.');
    }
  },

  registerCommand() {
    // Define the options for the "cmd" command
    const options: ApplicationCommandOptionData[] = [
      {
        type: ApplicationCommandOptionType.String,
        name: 'text',
        description: 'Command to send to G-Portal.',
        required: true,
      },
    ];

    return {
      name: 'cmd',
      description: 'Send a command to G-Portal.',
      options,
    };
  },
};

export default cmdCommand;
