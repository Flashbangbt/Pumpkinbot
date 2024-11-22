"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPermissionsMessage = sendPermissionsMessage;
const discord_js_1 = require("discord.js");
/**
 * Sends a message listing the bot's permissions in a specified channel.
 * @param {Client} client - The Discord client.
 */
function sendPermissionsMessage(client, channel) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Ensure client.user is available (not null)
            if (!client.user) {
                console.error('Client user is not available');
                return;
            }
            // Use the provided server ID and channel ID
            const serverId = '1298728809419374703'; // Your server ID
            const channelId = '1308880384360058971'; // Your channel ID
            // Get the guild and channel objects
            const guild = client.guilds.cache.get(serverId);
            if (!guild) {
                console.error('Guild not found');
                return;
            }
            const channel = guild.channels.cache.get(channelId);
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
                discord_js_1.PermissionFlagsBits.SendMessages,
                discord_js_1.PermissionFlagsBits.SendMessages,
                discord_js_1.PermissionFlagsBits.ManageMessages,
                discord_js_1.PermissionFlagsBits.MentionEveryone,
                discord_js_1.PermissionFlagsBits.AttachFiles,
                discord_js_1.PermissionFlagsBits.UseExternalEmojis,
                discord_js_1.PermissionFlagsBits.AddReactions,
                discord_js_1.PermissionFlagsBits.UseVAD
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
            yield channel.send(permissionsMessage);
            console.log('Sent bot permissions message to channel');
        }
        catch (error) {
            console.error('Error sending permissions message:', error);
        }
    });
}
