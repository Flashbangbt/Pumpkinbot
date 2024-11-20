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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
exports.initializeCommands = initializeCommands;
const discord_js_1 = require("discord.js");
const cmd_1 = __importDefault(require("../commands/cmd")); // Correct path to cmd command
const say_1 = __importDefault(require("../commands/say")); // Correct path to say command
// Initialize the Discord client
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds],
});
exports.client = client;
// Function to register commands
function registerCommands() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const commands = [
            cmd_1.default.registerCommand(),
            say_1.default.registerCommand(),
        ];
        try {
            // Register the commands with Discord
            yield ((_a = client.application) === null || _a === void 0 ? void 0 : _a.commands.set(commands));
            console.log('Commands registered successfully.');
            // Log details of registered commands
            commands.forEach((command) => {
                if ('name' in command) {
                    console.log(`Registered command: ${command.name}`);
                }
                else {
                    console.error('Command object does not contain a "name" property:', command);
                }
            });
        }
        catch (error) {
            console.error('Error registering commands:', error);
        }
    });
}
// Export initializeCommands for use in bot.ts
function initializeCommands(client) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Initializing commands...');
        yield registerCommands();
    });
}
// Attach the interaction handler
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    const { commandName } = interaction;
    try {
        if (commandName === 'cmd') {
            console.log(`Executing 'cmd' command for user ${interaction.user.tag}.`);
            yield cmd_1.default.execute(interaction);
        }
        else if (commandName === 'say') {
            console.log(`Executing 'say' command for user ${interaction.user.tag}.`);
            yield say_1.default.execute(interaction);
        }
        else {
            console.error(`Unhandled command: ${commandName}`);
            yield interaction.reply('Command not recognized.');
        }
    }
    catch (error) {
        console.error(`Error handling command '${commandName}':`, error);
        yield interaction.reply('There was an error executing your command.');
    }
}));
// Bot ready event
client.once('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(`${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag} is logged in!`);
    yield registerCommands(); // Register commands when bot is ready
}));
// Log in the bot
if (!process.env.BOT_TOKEN) {
    console.error('BOT_TOKEN is not defined in the .env file.');
    process.exit(1);
}
else {
    client
        .login(process.env.BOT_TOKEN)
        .then(() => console.log('Bot logged in successfully!'))
        .catch((error) => {
        console.error('Error logging in the bot:', error);
        process.exit(1);
    });
}
