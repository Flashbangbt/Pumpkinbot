import { CommandInteraction, CacheType, SlashCommandBuilder, Client } from 'discord.js';
import { getCommandGroups } from '../sql/Database'; // Ensure this is correct
import { rce } from '../../bot';
import cron from 'node-cron'; // Import node-cron

// Register the /timedcmd command
export const registerTimedCmd = async (client: Client) => {
  // Ensure client.application exists
  if (!client.application) {
    console.error('No application manager found.');
    return;
  }

  const commands = [
    new SlashCommandBuilder()
      .setName('timedcmd')
      .setDescription('Schedule a command to run at a specified time')
      .addStringOption(option =>
        option.setName('group')
          .setDescription('The name of the command group')
          .setRequired(true))
      .addStringOption(option =>
        option.setName('cron')
          .setDescription('Cron expression for scheduling the command (e.g., "0 * * * *" for every hour)')
          .setRequired(true))
  ];

  try {
    // Register the command with client.application.commands
    await client.application.commands.set(commands);
    console.log('timedcmd command registered successfully.');
  } catch (error) {
    console.error('Error registering timedcmd command:', error);
  }
};

// Handle the /timedcmd command interaction
export const handleTimedCmd = async (interaction: CommandInteraction<CacheType>) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'timedcmd') {
    const groupName = options.get('group')?.value as string;
    const cronExpression = options.get('cron')?.value as string;

    if (!groupName || !cronExpression) {
      await interaction.reply('Please provide both a valid command group and a cron expression.');
      return;
    }

    try {
      // Fetch command group from the database
      const commandGroups = await getCommandGroups(groupName);
      if (!commandGroups || commandGroups.length === 0) {
        await interaction.reply(`Command group "${groupName}" not found.`);
        return;
      }

      // Fetch commands in this group (you'll need to implement this)
      const commandsInGroup = await getCommandsByGroup(groupName); 
      if (commandsInGroup.length === 0) {
        await interaction.reply(`No commands found in the "${groupName}" group.`);
        return;
      }

      // Choose a command to run (here, we just take the first command)
      const commandName = commandsInGroup[0].command_name;

      // Schedule the command to run at the specified time
      cron.schedule(cronExpression, async () => {
        try {
          console.log(`Running scheduled command "${commandName}" for group "${groupName}" at ${new Date()}`);

          // Send the command to G-Portal using your existing cmd.ts logic
          await rce.servers.command('misfits', commandName);
          console.log(`Command sent to G-Portal: ${commandName}`);
        } catch (error) {
          console.error('Error sending command to G-Portal:', error);
        }
      });

      await interaction.reply(`Scheduled command "${commandName}" to run at: ${cronExpression}`);
    } catch (error) {
      console.error('Error handling timedcmd command:', error);
      await interaction.reply('There was an error while processing your request.');
    }
  }
};

// Example function to get commands by group (you'll need to implement this)
async function getCommandsByGroup(groupName: string) {
  // Query your database to return commands associated with the group
  return [
    // Example commands data
    { command_name: 'say_hello_world' },
    { command_name: 'shutdown' },
  ];
}
