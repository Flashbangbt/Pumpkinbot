// src/gportal-auth/server-auth.ts
import { RCEManager } from 'rce.js';

export async function addServer(rce: RCEManager) {
  // Add your server configurations
  await rce.servers.add({
    identifier: 'misfits',
    region: 'EU',
    serverId: 7041651,  // Replace with your actual server ID
    intents: ['CREATE_ZONES']  // Add other intents as necessary
  });

  console.log('Server added successfully');
}
