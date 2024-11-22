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
exports.handleCmdGroupDelete = exports.registerCmdGroupDelete = void 0;
const discord_js_1 = require("discord.js"); // Import Client for Discord.js v14
const Database_1 = require("../sql/Database"); // Import the delete function
// Register the /cmdgroup-delete command
const registerCmdGroupDelete = (client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const commands = [
        new discord_js_1.SlashCommandBuilder()
            .setName('cmdgroup-delete')
            .setDescription('Delete a command group')
            .addStringOption(option => option.setName('name')
            .setDescription('The name of the command group to delete')
            .setRequired(true))
    ];
    try {
        // Register the command with the application commands
        yield ((_a = client.application) === null || _a === void 0 ? void 0 : _a.commands.set(commands)); // Use the application commands manager
        console.log('cmdgroup-delete command registered successfully.');
    }
    catch (error) {
        console.error('Error registering cmdgroup-delete command:', error);
    }
});
exports.registerCmdGroupDelete = registerCmdGroupDelete;
// Handle the /cmdgroup-delete command interaction
const handleCmdGroupDelete = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!interaction.isCommand())
        return;
    const { commandName, options } = interaction;
    if (commandName === 'cmdgroup-delete') {
        // Correct way to access string options in v14
        const groupName = (_a = options.get('name')) === null || _a === void 0 ? void 0 : _a.value; // Use .get('name') and cast the value to string
        if (!groupName) {
            yield interaction.reply('Command group name is required!');
            return;
        }
        try {
            // Call the delete function from the database
            yield (0, Database_1.deleteCommandGroup)(groupName);
            yield interaction.reply(`Command group "${groupName}" deleted successfully.`);
        }
        catch (error) {
            console.error('Error handling cmdgroup-delete command:', error);
            yield interaction.reply('There was an error while deleting the command group.');
        }
    }
});
exports.handleCmdGroupDelete = handleCmdGroupDelete;
