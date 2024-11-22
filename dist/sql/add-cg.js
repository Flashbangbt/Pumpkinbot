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
exports.handleCmdCreateGroup = exports.registerCommands = void 0;
const discord_js_1 = require("discord.js");
const sql_1 = __importDefault(require("../sql")); // Import the database connection or module
// Command registration (can be in a separate file, but adding it here for now)
const registerCommands = (client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const commands = [
        new discord_js_1.SlashCommandBuilder()
            .setName('cmdcreategroup')
            .setDescription('Create a new command group')
            .addStringOption(option => option.setName('name')
            .setDescription('The name of the command group')
            .setRequired(true))
    ];
    // Register the commands with Discord
    yield ((_a = client.application) === null || _a === void 0 ? void 0 : _a.commands.set(commands));
    console.log('Commands registered.');
});
exports.registerCommands = registerCommands;
// The command handler for /cmdcreategroup
const handleCmdCreateGroup = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!interaction.isCommand())
        return;
    const { commandName, options } = interaction;
    // If the command is /cmdcreategroup
    if (commandName === 'cmdcreategroup') {
        const groupName = (_a = options.get('name')) === null || _a === void 0 ? void 0 : _a.value; // Get the group name as a string
        if (!groupName) {
            yield interaction.reply('Please provide a valid group name.');
            return;
        }
        try {
            // Create the group in the database
            createCommandGroup(groupName);
            yield interaction.reply(`Command group "${groupName}" created successfully.`);
        }
        catch (error) {
            console.error('Error creating command group:', error);
            yield interaction.reply('There was an error while creating the command group.');
        }
    }
});
exports.handleCmdCreateGroup = handleCmdCreateGroup;
// Function to insert the group name into the database
function createCommandGroup(groupName) {
    const insertQuery = `
    INSERT INTO command_groups (group_name)
    VALUES (?);
  `;
    try {
        // Insert the group name into the database
        sql_1.default.prepare(insertQuery).run(groupName);
        console.log(`Command group "${groupName}" added to the database.`);
    }
    catch (error) {
        console.error(`Error adding command group to DB: ${error}`);
        throw error;
    }
}
