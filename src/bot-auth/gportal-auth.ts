import { RCEManager, LogLevel } from 'rce.js';

export async function initializeRCE() {
  const rce = new RCEManager();

  // Initialize the RCE Manager with bot credentials and log level
  await rce.init(
    { username: process.env.RCE_USERNAME, password: process.env.RCE_PASSWORD },
    { level: LogLevel.Info }
  );

  // Add your server configurations
  await rce.servers.add({
    identifier: 'misfits',
    region: 'EU',
    serverId: 7041651,  // Replace with your actual server ID
    intents: ['CREATE_ZONES']  // Add other intents as necessary
  });

  return rce;
}
