import { CommandInteraction, CacheType, SlashCommandBuilder, ApplicationCommandDataResolvable } from 'discord.js';
import { rce } from '../bot';  // Ensure this is correctly imported

// Define the cmd command structure
const cmdCommand = {
  name: 'cmd',
  description: 'Send a command to G-Portal.',

  async execute(interaction: CommandInteraction<CacheType>) {
    if (!interaction.isCommand()) return;

    const text = interaction.options.get('text')?.value as string;

    console.log(`Received 'cmd' command from Discord: ${text}`);

    // Check if text was provided
    if (!text) {
      await interaction.reply('You didn\'t provide any text!');
      console.error('Text option is missing from interaction.');
      return;
    }

    // Send the command to the server
    console.log(`Sending command to G-Portal: ${text}`);
    try {
      // Make sure to replace 'misfits' with your actual server name or ID if needed
      await rce.servers.command('misfits', `${text}`);
      console.log(`Command sent to G-Portal: ${text}`);

      // Send the response back to Discord
      await interaction.reply(`Command sent: "${text}"`);
      console.log(`Sent response back to Discord: Command sent: "${text}"`);
    } catch (error: any) {
      console.error('Error sending command to server:', error);
      await interaction.reply('There was an error processing your command.');
    }
  },

  registerCommand() {
    return new SlashCommandBuilder()
      .setName('cmd')
      .setDescription('Send a command to G-Portal.')
      .addStringOption(option =>
        option.setName('text')
          .setDescription('Command to send to G-Portal.')
          .setRequired(true)
      )
      .toJSON();  // Return the command in JSON format for Discord API registration
  }
};

export default cmdCommand;
