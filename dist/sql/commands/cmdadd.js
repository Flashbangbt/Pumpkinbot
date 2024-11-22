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
exports.handleCmdAdd = exports.registerCmdAdd = void 0;
const discord_js_1 = require("discord.js");
const Database_1 = require("../sql/Database"); // Correctly importing the database function
// Register the /cmdadd command
const registerCmdAdd = (client) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure client.application exists
    if (!client.application) {
        console.error('No application manager found.');
        return {}; // Return an empty object if no client.application exists
    }
    // Create the slash command
    const command = new discord_js_1.SlashCommandBuilder()
        .setName('cmdadd')
        .setDescription('Add a command to the specified group')
        .addStringOption(option => option.setName('command')
        .setDescription('The command to add')
        .setRequired(true))
        .addStringOption(option => option.setName('group')
        .setDescription('The command group')
        .setRequired(true)) // Add group option
        .toJSON(); // Convert to ApplicationCommandDataResolvable
    try {
        // Register the command with client.application.commands
        yield client.application.commands.set([command]); // Pass the array containing the single command
        console.log('cmdadd command registered successfully.');
    }
    catch (error) {
        console.error('Error registering cmdadd command:', error);
    }
    return command; // Return the single command as ApplicationCommandDataResolvable
});
exports.registerCmdAdd = registerCmdAdd;
// Handle the /cmdadd command interaction
const handleCmdAdd = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!interaction.isCommand())
        return;
    const { commandName, options } = interaction;
    if (commandName === 'cmdadd') {
        // Use .get() to fetch command and group options
        const command = (_a = options.get('command')) === null || _a === void 0 ? void 0 : _a.value;
        const group = (_b = options.get('group')) === null || _b === void 0 ? void 0 : _b.value;
        if (!command || !group) {
            yield interaction.reply('Please provide valid command and group names.');
            return;
        }
        try {
            // Insert the command group into the database
            yield (0, Database_1.insertCommandGroup)(group); // Ensure you're inserting the group correctly
            yield interaction.reply(`Command "${command}" added to group "${group}" successfully.`);
        }
        catch (error) {
            console.error('Error handling cmdadd command:', error);
            yield interaction.reply('There was an error while adding the command.');
        }
    }
});
exports.handleCmdAdd = handleCmdAdd;
