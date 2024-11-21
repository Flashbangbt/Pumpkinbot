import { Client } from 'discord.js'; // Import Client for Discord.js v14
import { registerCmdGroupDelete } from '../commands/cmdgroup-delete';
import { registerCmdAdd } from '../commands/cmdadd'; 
import { handleCmdGroupDelete } from '../commands/cmd-delete';
import { registerTimedCmd } from '../commands/timedcmd';
import { registerCmdGroupAdd } from '../commands/cmdgroup-add';

// Adjust the parameter type to use Client from Discord.js v14
export const registerGPCommands = async (client: Client) => {
  try {
    // Access the commands property directly from the client for registration
    const commands = client.application?.commands;

    if (!commands) {
      console.error('No commands manager found.');
      return;
    }

    // Register all the commands
    await registerCmdGroupDelete(client);  // Pass client to functions
    await registerCmdGroupAdd(client);     // Pass client to functions
    await registerCmdAdd(client);          // Pass client to functions
    await registerCmdGroupDelete(client);         // Pass client to functions
    await registerTimedCmd(client);        // Pass client to functions

    console.log('All GP-related commands have been registered.');
  } catch (error) {
    console.error('Error registering GP commands:', error);
  }
};
