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
exports.rce = void 0;
require("dotenv/config"); // Load environment variables
const discord_js_1 = require("discord.js"); // Import discord.js for client initialization
const rce_js_1 = require("rce.js"); // Import RCE components
const main_1 = require("./utils/main"); // Correct import for initializeCommands
// Initialize the Discord client
const discordClient = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent
    ]
});
discordClient.on('ready', () => {
    var _a;
    console.log(`Logged in as ${(_a = discordClient.user) === null || _a === void 0 ? void 0 : _a.tag}`);
});
// Initialize the RCEManager
exports.rce = new rce_js_1.RCEManager();
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Initializing bot...');
            // Check for BOT_TOKEN
            if (!process.env.BOT_TOKEN) {
                console.error('BOT_TOKEN is not defined in the .env file.');
                process.exit(1);
            }
            else {
                console.log('BOT_TOKEN found in .env file.');
            }
            // Check for RCE credentials
            if (!process.env.RCE_USERNAME || !process.env.RCE_PASSWORD) {
                console.error('RCE_USERNAME or RCE_PASSWORD are not defined in the .env file.');
                process.exit(1);
            }
            else {
                console.log('RCE credentials found in .env file.');
            }
            // Initialize RCE
            console.log('Initializing RCE...');
            yield exports.rce.init({
                username: process.env.RCE_USERNAME, // G-PORTAL username
                password: process.env.RCE_PASSWORD, // G-PORTAL password
            }, {
                level: rce_js_1.LogLevel.Info, // Log level
                file: 'rce.log', // Log file
            });
            console.log('RCE Initialized successfully');
            // Add server to RCEManager
            console.log('Adding server to RCEManager...');
            yield exports.rce.servers.add({
                identifier: 'misfits',
                serverId: 7041651, // Replace with your actual server ID
                region: 'EU',
                intents: [rce_js_1.RCEIntent.All],
                state: ['quads', '2x'],
            });
            console.log('Server added successfully.');
            // Verify server retrieval
            const server = exports.rce.servers.get('misfits');
            if (server) {
                console.log('Server found:', server);
            }
            else {
                console.error('Server not found!');
            }
            // Initialize commands (from main.ts)
            console.log('Initializing commands...');
            yield (0, main_1.initializeCommands)(discordClient); // Call the function to register commands
            // Log in to Discord
            console.log('Logging in to Discord...');
            yield discordClient.login(process.env.BOT_TOKEN);
            console.log('Logged in to Discord successfully!');
        }
        catch (error) {
            console.error('Error initializing the bot:', error);
            process.exit(1); // Exit with error
        }
    });
}
// Run the initialization
initialize();
