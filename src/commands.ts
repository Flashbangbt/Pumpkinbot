import { RCEManager } from "rce.js";
import * as localDB from '../localDb';  // Make sure the relative path is correct

export async function handleZoneEmote(
  interaction: any, 
  rce: RCEManager, 
  serverId: string, 
  playerName: string, 
  message: string
) {
  const playerId = interaction?.user?.id;  // Assuming user ID for identifying player
  const position = await rce.servers.command(serverId, `printpos "${playerName}"`);

  let zoneSize = '';
  let sizeMessage = '';

  // Define zone size and message based on the received emote message
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
    // Check if the player is part of a team
    const playerTeam = await rce.servers.command(serverId, `relationshipmanager.findplayerteam "${playerId}"`);

    if (typeof playerTeam === 'string' && playerTeam.includes("NOT IN A TEAM")) {
      await interaction.reply("Player is not in a team.");
      return;
    }

    // Read player data from local DB
    const teamInfo = await localDB.readData();
    const playerData = teamInfo.players.find(player => player.name === playerName);

    if (playerData) {
      // If the player exists in the DB, ensure they are the team leader
      if (playerData.team !== playerTeam) {
        await interaction.reply("You are not the team leader.");
        return;
      }

      // Create the custom zone
      await rce.servers.command(serverId, `zones.createcustomzone "${playerName}_zone" ${position} ${zoneSize} SPHERE (225,150,150) 1`);
      await interaction.reply(`Zone created at ${position} with size ${zoneSize}.`);
    } else {
      // If the player doesn't exist in the DB, find the team leader
      const teamId = (playerTeam as string).match(/Team (\d+)/)?.[1];  // Assert playerTeam as string

      if (teamId) {
        const teamInfoResponse = await rce.servers.command(serverId, `teaminfo "#${teamId}"`);

        const leader = (teamInfoResponse as string).match(/(.*)\s\(\w+\)$/)?.[1];  // Assert teamInfoResponse as string
        const teamMembers = (teamInfoResponse as string).split("\n").map(line => line.trim());

        // Update player data in the local DB
        await localDB.addOrUpdatePlayer(playerName, playerTeam, zoneSize, position);

        // Check if the player is the team leader
        if (leader !== playerName) {
          await interaction.reply("You need to be the team leader to create a zone.");
        } else {
          // Create the custom zone if the player is the leader
          await rce.servers.command(serverId, `zones.createcustomzone "${playerName}_zone" ${position} ${zoneSize} SPHERE (225,150,150) 1`);
          await interaction.reply(`Zone created at ${position} with size ${zoneSize}.`);
        }
      } else {
        await interaction.reply("Unable to find team info.");
      }
    }
  }
}
