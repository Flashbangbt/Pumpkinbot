import { rce } from '../bot'; // Import the initialized RCEManager from bot.ts

export const onPlayerKill = async (serverIdentifier: string, killer: string, victim: string) => {
  try {
    // Retrieve the server directly using RCEManager
    const server = rce.servers.get(serverIdentifier);

    if (!server) {
      console.error(`Server with identifier "${serverIdentifier}" not found!`);
      return;
    }

    // Construct the kill message
    const message = `<b><color=#0096FF>${killer}</color> <color=#FFA500>« whacked ${victim}</color></b>`;


    console.log(`Sending kill message to G-Portal: ${message}`);
    // Send the command to the server
    await rce.servers.command(server.identifier, `say ${message}`);
  } catch (error) {
    console.error(`Error handling player kill: ${error}`);
  }
};
