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
const Database_1 = require("../sql/sql/Database"); // Fixed import path
const cmdDelete = {
    name: 'cmd-delete', // Name of the command
    description: 'Delete a command from a command group.',
    // Command execution logic
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const groupName = (_a = interaction.options.get('name')) === null || _a === void 0 ? void 0 : _a.value; // Get the group name from the interaction
            if (!groupName) {
                yield interaction.reply('Command group name is required!');
                return;
            }
            try {
                // Call the function to delete the command from the selected group
                yield (0, Database_1.deleteCommandFromGroup)(groupName);
                yield interaction.reply(`Command was removed from "${groupName}" successfully.`);
            }
            catch (error) {
                console.error('Error handling cmd-delete command:', error);
                yield interaction.reply('There was an error while deleting the command.');
            }
        });
    },
    // Command registration details
    registerCommand() {
        const options = [
            {
                type: discord_js_1.ApplicationCommandOptionType.String,
                name: 'name', // Name of the group to delete
                description: 'Name of the command group to delete.',
                required: true,
            },
        ];
        return {
            name: 'cmd-delete', // Command name
            description: 'Delete a command from a group.',
            options, // Command options
        };
    },
};
exports.default = cmdDelete;
