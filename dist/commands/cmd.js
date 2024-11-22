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
const discord_js_1 = require("discord.js");
const bot_1 = require("../bot"); // Ensure this is correctly imported
// Define the cmd command structure
const cmdCommand = {
    name: 'cmd',
    description: 'Send a command to G-Portal.',
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!interaction.isCommand())
                return;
            const text = (_a = interaction.options.get('text')) === null || _a === void 0 ? void 0 : _a.value;
            console.log(`Received 'cmd' command from Discord: ${text}`);
            // Check if text was provided
            if (!text) {
                yield interaction.reply('You didn\'t provide any text!');
                console.error('Text option is missing from interaction.');
                return;
            }
            // Send the command to the server
            console.log(`Sending command to G-Portal: ${text}`);
            try {
                // Make sure to replace 'misfits' with your actual server name or ID if needed
                yield bot_1.rce.servers.command('misfits', `${text}`);
                console.log(`Command sent to G-Portal: ${text}`);
                // Send the response back to Discord
                yield interaction.reply(`Command sent: "${text}"`);
                console.log(`Sent response back to Discord: Command sent: "${text}"`);
            }
            catch (error) {
                console.error('Error sending command to server:', error);
                yield interaction.reply('There was an error processing your command.');
            }
        });
    },
    registerCommand() {
        return new discord_js_1.SlashCommandBuilder()
            .setName('cmd')
            .setDescription('Send a command to G-Portal.')
            .addStringOption(option => option.setName('text')
            .setDescription('Command to send to G-Portal.')
            .setRequired(true))
            .toJSON(); // Return the command in JSON format for Discord API registration
    }
};
exports.default = cmdCommand;
