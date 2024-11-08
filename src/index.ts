import { Client, GatewayIntentBits } from "discord.js";
import { RCEManager, LogLevel, RCEEvent, RCEIntent } from "rce.js";
import { handleZoneEmote } from "./commands";  // Import the function from commands.ts

// Initialize the bot
async function startBot() {
  const rce = new RCEManager();
  await rce.init(
    { username: "**removed}}""password"
    { level: LogLevel.Info }
  );

  await rce.servers.addMany([
    {
      identifier: "misfits",
      region: "EU",
      serverId: ""
      intents: [RCEIntent.ConsoleMessages],
      playerRefreshing: true,
      radioRefreshing: true,
      extendedEventRefreshing: true,
    },
  ]);

  // Listen for quick chat events and trigger zone handling logic
  rce.events.on(RCEEvent.QuickChat, async (payload) => {
    const serverId = "misfits";
    const playerName = payload.ign;
    const message = payload.message;

    console.log(`[${payload.server.identifier}] ${playerName} sent quick chat: ${message}`);

    // Handle emote for zone creation
    await handleZoneEmote(null, rce, serverId, playerName, message);
  });

  // Discord client setup
  const discordClient = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
    ],
  });

  discordClient.once("ready", () => {
    console.log("Bot is ready!");
  });

  discordClient.login("your-bot-token");
}

startBot();
