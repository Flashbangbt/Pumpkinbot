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
exports.handleCmdGroupAdd = exports.registerCmdGroupAdd = void 0;
const discord_js_1 = require("discord.js"); // Import necessary types
const Database_1 = require("../sql/Database"); // Import the insert function
// Register the /cmdgroup-add command
const registerCmdGroupAdd = (client) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure client.application exists
    if (!client.application) {
        console.error('No application manager found.');
        return {}; // Return an empty object if no client.application exists
    }
    const command = new discord_js_1.SlashCommandBuilder()
        .setName('cmdgroup-add')
        .setDescription('Add a new command group')
        .addStringOption(option => option.setName('group')
        .setDescription('The name of the command group')
        .setRequired(true)) // Add the 'group' option
        .toJSON(); // Convert to ApplicationCommandDataResolvable
    try {
        // Register the command with the application commands
        yield client.application.commands.set([command]); // Pass the command inside an array
        console.log('cmdgroup-add command registered successfully.');
    }
    catch (error) {
        console.error('Error registering cmdgroup-add command:', error);
    }
    return command; // Return the command as ApplicationCommandDataResolvable
});
exports.registerCmdGroupAdd = registerCmdGroupAdd;
// Handle the /cmdgroup-add command interaction
const handleCmdGroupAdd = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!interaction.isCommand())
        return;
    const { commandName, options } = interaction;
    if (commandName === 'cmdgroup-add') {
        // Correct way to access string options in v14
        const groupName = (_a = options.get('group')) === null || _a === void 0 ? void 0 : _a.value; // Use .get('group') and cast the value to string
        if (!groupName) {
            yield interaction.reply('Command group name is required!');
            return;
        }
        try {
            // Call the insert function from the database
            yield (0, Database_1.insertCommandGroup)(groupName);
            yield interaction.reply(`Command group "${groupName}" added successfully.`);
        }
        catch (error) {
            console.error('Error handling cmdgroup-add command:', error);
            yield interaction.reply('There was an error while adding the command group.');
        }
    }
});
exports.handleCmdGroupAdd = handleCmdGroupAdd;
