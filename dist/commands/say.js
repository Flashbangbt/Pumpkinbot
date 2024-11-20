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
const bot_1 = require("../bot"); // Ensure this is correctly imported from where it's defined
const sayCommand = {
    name: 'say',
    description: 'Send an in-game message.',
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Get the text input from the user
            const text = (_a = interaction.options.get('text')) === null || _a === void 0 ? void 0 : _a.value;
            console.log(`Received 'say' command from Discord: ${text}`);
            // Check if text was provided
            if (!text) {
                yield interaction.reply('You didn\'t provide any text!');
                console.error('Text option is missing from interaction.');
                return;
            }
            // Send the command to the server
            console.log(`Sending command to G-Portal: say ${text}`);
            try {
                // Make sure to replace 'misfits' with your actual server name or ID if needed
                yield bot_1.rce.servers.command('misfits', `say ${text}`);
                console.log(`Command sent to G-Portal: say ${text}`);
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
        // Define the options for the "say" command
        const options = [
            {
                type: discord_js_1.ApplicationCommandOptionType.String,
                name: 'text',
                description: 'Text to send in-game.',
                required: true,
            },
        ];
        return {
            name: 'say',
            description: 'Send an in-game message.',
            options,
        };
    },
};
exports.default = sayCommand;
