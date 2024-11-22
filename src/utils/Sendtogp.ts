// gportal-utils.ts
import { rce } from '../bot'; // Ensure you import rce (or whatever object provides G-Portal interaction)

// Function to send a command to G-Portal server
export async function sendToGPortal(serverName: string, commandText: string) {
  try {
    // Send the command to the specified G-Portal server
    await rce.servers.command(serverName, `${commandText}`);
    console.log(`Command sent to G-Portal: ${commandText}`);
    return true; // Indicate success
  } catch (error) {
    console.error('Error sending command to G-Portal:', error);
    throw new Error('There was an error sending the command to G-Portal.');
  }
}
