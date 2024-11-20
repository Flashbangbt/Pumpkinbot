import { Client, GatewayIntentBits, ApplicationCommandDataResolvable } from 'discord.js';
import cmdCommand from '../commands/cmd'; // Correct path to cmd command
import sayCommand from '../commands/say'; // Correct path to say command

// Initialize the Discord client
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Function to register commands
async function registerCommands() {
  const commands: ApplicationCommandDataResolvable[] = [
    cmdCommand.registerCommand(),
    sayCommand.registerCommand(),
  ];

  try {
    // Register the commands with Discord
    await client.application?.commands.set(commands);
    console.log('Commands registered successfully.');

    // Log details of registered commands
    commands.forEach((command) => {
      if ('name' in command) {
        console.log(`Registered command: ${command.name}`);
      } else {
        console.error('Command object does not contain a "name" property:', command);
      }
    });
  } catch (error) {
    console.error('Error registering commands:', error);
  }
}

// Export initializeCommands for use in bot.ts
export async function initializeCommands(client: Client) {
  console.log('Initializing commands...');
  await registerCommands();
}

// Attach the interaction handler
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  try {
    if (commandName === 'cmd') {
      console.log(`Executing 'cmd' command for user ${interaction.user.tag}.`);
      await cmdCommand.execute(interaction);
    } else if (commandName === 'say') {
      console.log(`Executing 'say' command for user ${interaction.user.tag}.`);
      await sayCommand.execute(interaction);
    } else {
      console.error(`Unhandled command: ${commandName}`);
      await interaction.reply('Command not recognized.');
    }
  } catch (error) {
    console.error(`Error handling command '${commandName}':`, error);
    await interaction.reply('There was an error executing your command.');
  }
});

// Bot ready event
client.once('ready', async () => {
  console.log(`${client.user?.tag} is logged in!`);
  await registerCommands();  // Register commands when bot is ready
});

// Log in the bot
if (!process.env.BOT_TOKEN) {
  console.error('BOT_TOKEN is not defined in the .env file.');
  process.exit(1);
} else {
  client
    .login(process.env.BOT_TOKEN)
    .then(() => console.log('Bot logged in successfully!'))
    .catch((error) => {
      console.error('Error logging in the bot:', error);
      process.exit(1);
    });
}

// Export the client for use in bot.ts
export { client };
