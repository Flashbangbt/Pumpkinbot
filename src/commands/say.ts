import { CommandInteraction, ApplicationCommandOptionType, ApplicationCommandOptionData } from 'discord.js';
import { rce } from '../bot'; // Ensure this is correctly imported from where it's defined

const sayCommand = {
  name: 'say',
  description: 'Send an in-game message.',

  async execute(interaction: CommandInteraction) {
    // Get the text input from the user
    const text = interaction.options.get('text')?.value as string;
    
    console.log(`Received 'say' command from Discord: ${text}`);

    // Check if text was provided
    if (!text) {
      await interaction.reply('You didn\'t provide any text!');
      console.error('Text option is missing from interaction.');
      return;
    }

    // Send the command to the server
    console.log(`Sending command to G-Portal: say ${text}`);
    try {
      // Make sure to replace 'misfits' with your actual server name or ID if needed
      await rce.servers.command('misfits', `say ${text}`);
      console.log(`Command sent to G-Portal: say ${text}`);

      // Send the response back to Discord
      await interaction.reply(`Command sent: "${text}"`);
      console.log(`Sent response back to Discord: Command sent: "${text}"`);
    } catch (error) {
      console.error('Error sending command to server:', error);
      await interaction.reply('There was an error processing your command.');
    }
  },

  registerCommand() {
    // Define the options for the "say" command
    const options: ApplicationCommandOptionData[] = [
      {
        type: ApplicationCommandOptionType.String,
        name: 'text',
        description: 'Text to send in-game.',
        required: true,
      },
    ];

    return {
      name: 'say',
      description: 'Send an in-game message.',
      options,
    };
  },
};

export default sayCommand;
