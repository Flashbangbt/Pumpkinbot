"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDiscordClient = void 0;
const discord_js_1 = require("discord.js");
const initializeDiscordClient = () => {
    const discordClient = new discord_js_1.Client({
        intents: [
            discord_js_1.GatewayIntentBits.Guilds,
            discord_js_1.GatewayIntentBits.GuildMessages,
            discord_js_1.GatewayIntentBits.MessageContent,
        ],
    });
    // Adding an event listener to catch when the bot is ready
    discordClient.once('ready', () => {
        var _a;
        console.log(`Logged in as ${(_a = discordClient.user) === null || _a === void 0 ? void 0 : _a.tag}`);
    });
    return discordClient;
};
exports.initializeDiscordClient = initializeDiscordClient;
