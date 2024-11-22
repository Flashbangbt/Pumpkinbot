import { rce } from '../bot'; // Import the initialized RCEManager from bot.ts

export const onPlayerJoin = async (serverIdentifier: string, ign: string) => {
  try {
    // Retrieve the server directly using RCEManager
    const server = rce.servers.get(serverIdentifier);

    if (!server) {
      console.error(`Server with identifier "${serverIdentifier}" not found!`);
      return;
    }

    // Construct the join message
    const message = `${ign} has joined the game!`;

    console.log(`Sending join message to G-Portal: ${message}`);
    // Send the command to the server
    await rce.servers.command(server.identifier, `say ${message}`);
  } catch (error) {
    console.error(`Error handling player join: ${error}`);
  }
};
