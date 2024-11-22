import { Client, TextChannel, PermissionFlagsBits } from 'discord.js';

/**
 * Sends a message listing the bot's permissions in a specified channel.
 * @param {Client} client - The Discord client.
 */
export async function sendPermissionsMessage(client: Client, channel: unknown) {
  try {
    // Ensure client.user is available (not null)
    if (!client.user) {
      console.error('Client user is not available');
      return;
    }

    // Use the provided server ID and channel ID
    const serverId = '1298728809419374703';  // Your server ID
    const channelId = '1308880384360058971'; // Your channel ID

    // Get the guild and channel objects
    const guild = client.guilds.cache.get(serverId);
    if (!guild) {
      console.error('Guild not found');
      return;
    }

    const channel = guild.channels.cache.get(channelId) as TextChannel;
    if (!channel) {
      console.error('Text channel not found');
      return;
    }

    // Check the bot's permissions in the channel
    const permissions = channel.permissionsFor(client.user);
    if (!permissions) {
      console.error('Could not retrieve bot permissions');
      return;
    }

    // List of permissions the bot might need (using PermissionFlagsBits)
    const permissionsList = [
      PermissionFlagsBits.SendMessages, 
      PermissionFlagsBits.SendMessages, 
      PermissionFlagsBits.ManageMessages, 
      PermissionFlagsBits.MentionEveryone, 
      PermissionFlagsBits.AttachFiles, 
      PermissionFlagsBits.UseExternalEmojis, 
      PermissionFlagsBits.AddReactions, 
      PermissionFlagsBits.UseVAD
    ];

    // Filter out the permissions the bot has
    const grantedPermissions = permissionsList.filter(permission => permissions.has(permission));
    const missingPermissions = permissionsList.filter(permission => !permissions.has(permission));

    // Prepare the message
    const permissionsMessage = `
      **Bot Permissions:**

      **Granted:**
      ${grantedPermissions.map(permission => permission.toString()).join(', ')}

      **Missing:**
      ${missingPermissions.map(permission => permission.toString()).join(', ')}
    `;

    // Send the permissions message to the specified channel
    await channel.send(permissionsMessage);
    console.log('Sent bot permissions message to channel');
  } catch (error) {
    console.error('Error sending permissions message:', error);
  }
}
