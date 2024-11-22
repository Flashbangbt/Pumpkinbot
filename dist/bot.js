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
exports.client = exports.rce = void 0;
const discord_js_1 = require("discord.js");
const rce_js_1 = require("rce.js");
const main_1 = require("./gp/main");
const main_2 = require("./utils/main");
const sendPermissionsMessage_1 = require("./utils/sendPermissionsMessage");
const discordClient = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
    ]
});
exports.rce = new rce_js_1.RCEManager();
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Initializing bot...');
            if (!process.env.BOT_TOKEN) {
                console.error('BOT_TOKEN is not defined in the .env file.');
                process.exit(1);
            }
            discordClient.once('ready', () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                console.log(`Bot is ready! Logged in as ${(_a = discordClient.user) === null || _a === void 0 ? void 0 : _a.tag}`);
                console.log('Registering commands...');
                yield (0, main_2.registerAllCommands)(discordClient);
                console.log('Initializing command handlers...');
                yield (0, main_2.initializeCommands)(discordClient);
                console.log('Commands are ready!');
                const channel = discordClient.channels.cache.get('1308880384360058971');
                if (channel === null || channel === void 0 ? void 0 : channel.isTextBased()) {
                    yield (0, sendPermissionsMessage_1.sendPermissionsMessage)(discordClient, channel);
                }
            }));
            console.log('Initializing RCE...');
            yield exports.rce.init({
                username: process.env.RCE_USERNAME,
                password: process.env.RCE_PASSWORD,
            }, {
                level: rce_js_1.LogLevel.Info,
                file: 'rce.log',
            });
            yield exports.rce.servers.add({
                identifier: 'misfits',
                serverId: 7041651,
                region: 'EU',
                intents: [rce_js_1.RCEIntent.All],
                playerRefreshing: true,
                state: ['quads', '2x'],
            });
            const server = exports.rce.servers.get('misfits');
            if (server) {
                console.log(`Server found: ${server.identifier}`);
                console.log(`Server status: ${server.status}`);
                console.log(`Players: ${server.players.length}`);
            }
            console.log('Setting up player event listeners...');
            yield (0, main_1.setupAllListeners)();
            console.log('Player event listeners set up successfully.');
            yield discordClient.login(process.env.BOT_TOKEN);
            console.log('Discord login successful!');
        }
        catch (error) {
            console.error('Error initializing the bot:', error);
            process.exit(1);
        }
    });
}
initialize();
exports.client = discordClient;
