import { RCEManager } from "rce.js";
import * as localDB from './localDb';  // Local DB for storing player/team data

// 'say' command: sends a message to the server
export async function say(interaction: any, rce: RCEManager, serverId: string, message: string) {
  await rce.servers.command(serverId, `say ${message}`);
  await interaction.reply(`Message sent: ${message}`);
}

// 'sendcommand' command: sends a custom command to the server
export async function sendCommand(interaction: any, rce: RCEManager, serverId: string, command: string) {
  await rce.servers.command(serverId, command);
  await interaction.reply(`Command sent: ${command}`);
}

// 'zone' command: handles zone creation based on player emote/message
export async function handleZoneEmote(
  interaction: any, 
  rce: RCEManager, 
  serverId: string, 
  playerName: string, 
  message: string
) {
  const playerId = interaction?.user?.id;
  const position = await rce.servers.command(serverId, `printpos "${playerName}"`);
  let zoneSize = '';
  let sizeMessage = '';

  // Logic for setting zone size based on message (emote)
  switch (message) {
    case "I need building permission":
      zoneSize = "Please select a size";
      sizeMessage = "small = Can I have a key? (combat slot 3)\nmedium = We need a better door (combat slot 4)\nlarge = Our upkeep is running low (combat slot 5)";
      break;
    case "small":
      zoneSize = "key=small";
      sizeMessage = "Zone size small selected.";
      break;
    case "medium":
      zoneSize = "better door=medium";
      sizeMessage = "Zone size medium selected.";
      break;
    case "large":
      zoneSize = "upkeep=low=large";
      sizeMessage = "Zone size large selected.";
      break;
    default:
      zoneSize = "unknown";
      sizeMessage = "Invalid emote.";
      break;
  }

  // Send the selected zone size or invalid message
  await interaction.reply(sizeMessage);

  if (zoneSize !== "unknown") {
    const playerTeam = await rce.servers.command(serverId, `relationshipmanager.findplayerteam "${playerId}"`);

    if (typeof playerTeam === 'string' && playerTeam.includes("NOT IN A TEAM")) {
      await interaction.reply("Player is not in a team.");
      return;
    }

    // Read data from local DB for player information
    const teamInfo = await localDB.readData();
    const playerData = teamInfo.players.find(player => player.name === playerName);

    if (playerData) {
      if (playerData.team !== playerTeam) {
        await interaction.reply("You are not the team leader.");
        return;
      }

      // Create zone if player is the team leader
      await rce.servers.command(serverId, `zones.createcustomzone "${playerName}_zone" ${position} ${zoneSize} SPHERE (225,150,150) 1`);
      await interaction.reply(`Zone created at ${position} with size ${zoneSize}.`);
    } else {
      const teamId = (playerTeam as string).match(/Team (\d+)/)?.[1];

      if (teamId) {
        const teamInfoResponse = await rce.servers.command(serverId, `teaminfo "#${teamId}"`);
        const leader = (teamInfoResponse as string).match(/(.*)\s\(\w+\)$/)?.[1];
        const teamMembers = (teamInfoResponse as string).split("\n").map(line => line.trim());

        await localDB.addOrUpdatePlayer(playerName, playerTeam, zoneSize, position);

        if (leader !== playerName) {
          await interaction.reply("You need to be the team leader to create a zone.");
        } else {
          await rce.servers.command(serverId, `zones.createcustomzone "${playerName}_zone" ${position} ${zoneSize} SPHERE (225,150,150) 1`);
          await interaction.reply(`Zone created at ${position} with size ${zoneSize}.`);
        }
      } else {
        await interaction.reply("Unable to find team info.");
      }
    }
  }
}
