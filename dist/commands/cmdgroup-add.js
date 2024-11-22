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
const Database_1 = require("../sql/sql/Database");
// Define the cmdgroup-add command structure
const cmdGroupAddCommand = {
    name: 'cmdgroup-add',
    description: 'Add a new command group.',
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!interaction.isCommand())
                return;
            const groupName = (_b = (_a = interaction.options.get('group')) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.toString().trim();
            console.log(`Executing 'cmdgroup-add' with group name: ${groupName}`);
            // Validate if group name is provided
            if (!groupName) {
                console.error('No group name provided in the command.');
                yield interaction.reply('Command group name is required!');
                return;
            }
            try {
                // Attempt to insert the new command group into the database
                yield (0, Database_1.insertCommandGroup)(groupName);
                console.log(`Command group "${groupName}" added successfully.`);
                yield interaction.reply(`Command group "${groupName}" has been successfully added.`);
            }
            catch (error) {
                // Handle database insertion errors
                console.error(`Error while inserting command group "${groupName}":`, error);
                if (error.message.includes('already exists')) {
                    console.log(`The command group "${groupName}" already exists.`);
                    yield interaction.reply(`The command group "${groupName}" already exists. Please choose a different name.`);
                }
                else {
                    console.error('Unexpected error:', error);
                    yield interaction.reply('There was an error while adding the command group. Please try again later.');
                }
            }
        });
    },
    // Register the command with Discord
    registerCommand() {
        return new discord_js_1.SlashCommandBuilder()
            .setName('cmdgroup-add')
            .setDescription('Add a new command group.')
            .addStringOption(option => option.setName('group')
            .setDescription('The name of the group to add')
            .setRequired(true))
            .toJSON(); // Return the command in JSON format for Discord API registration
    }
};
exports.default = cmdGroupAddCommand;
