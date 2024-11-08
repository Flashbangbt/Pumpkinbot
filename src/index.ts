import { Client, GatewayIntentBits } from "discord.js";
import { RCEManager, LogLevel, RCEIntent, RCEEvent } from "rce.js";
import { say, sendCommand, handleZoneEmote } from "./commands";  // Importing command functions

// Wrap async logic inside a function to avoid top-level await error
async function startBot() {
  // Initialize RCE Manager
  const rce = new RCEManager();
  await rce.init(
    { username: "*REDACTED*", password: "*REDACTED*" },  // Replace with your actual login credentials or .env
    { level: LogLevel.Info }
  );

  // Add server(s) to RCEManager
  await rce.servers.addMany([
    {
      identifier: "misfits",
      region: "EU",
      serverId: 7041651, // Change this to your serverId
      intents: [RCEIntent.ConsoleMessages],
      playerRefreshing: true,
      radioRefreshing: true,
      extendedEventRefreshing: true,
    },
  ]);

  // Handle PlayerKill event (Optional, you can keep this or customize it)
  rce.events.on(RCEEvent.PlayerKill, async (data) => {
    console.log(`[${data.server.identifier}] ${data.killer.name} killed ${data.victim.name}`);
    await rce.servers.command(
      data.server.identifier,
      `say <color=red>${data.killer.name}</color> killed <color=red>${data.victim.name}</color>`
    );
  });

  // Discord bot client setup
  const discordClient = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  // Ready event for Discord bot
  discordClient.once("ready", () => {
    console.log("Discord bot is ready and connected.");
  });

  // Handling interactions (slash commands)
  discordClient.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;  // Check if the interaction is a command

    const { commandName } = interaction;
    const serverId = "misfits";  // Example server identifier, modify if necessary
    const playerName = interaction.user.username;  // Discord username as player name

    // Handling the "say" command
    if (commandName === "say") {
      const message = interaction.options.get("message")?.value as string;
      if (message) {
        await say(interaction, rce, serverId, message);  // Send message to server
      } else {
        await interaction.reply("Please provide a message.");
      }
    }

    // Handling the "sendcommand" command
    else if (commandName === "sendcommand") {
      const command = interaction.options.get("command")?.value as string;
      if (command) {
        await sendCommand(interaction, rce, serverId, command);  // Send custom command to server
      } else {
        await interaction.reply("Please provide a command.");
      }
    }

    // Handling the "zone" command for zone creation
    else if (commandName === "zone") {
      const message = interaction.options.getString('message');  // Get the message or emote input
      if (message) {
        await handleZoneEmote(interaction, rce, serverId, playerName, message);  // Create custom zone based on emote
      } else {
        await interaction.reply("Please provide a valid emote or message.");
      }
    }
  });

  // Set up slash commands for the bot
  const commandData = [
    {
      name: "say",
      description: "Send a message to the server",
      options: [
        {
          name: "message",
          type: 3, // STRING
          description: "The message to send",
          required: true,
        },
      ],
    },
    {
      name: "sendcommand",
      description: "Send a custom command to the server",
      options: [
        {
          name: "command",
          type: 3, // STRING
          description: "The command to send",
          required: true,
        },
      ],
    },
    {
      name: "zone",
      description: "Create a custom zone based on player emote",
      options: [
        {
          name: "message",
          type: 3, // STRING
          description: "The emote or message for the zone creation",
          required: true,
        },
      ],
    },
  ];

  // Register commands with Discord
  await discordClient.application?.commands.set(commandData);
  await discordClient.login("*REDACTED*");  // Replace with your Discord bot token or .env method
}

// Call the async function to start the bot
startBot();
