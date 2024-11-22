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
exports.registerTimedCmd = void 0;
const discord_js_1 = require("discord.js");
// Register the /timedcmd command
const registerTimedCmd = (client) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure client.application exists
    if (!client.application) {
        console.error('No application manager found.');
        return {}; // Return an empty object if no client.application exists
    }
    // Create the slash command
    const command = new discord_js_1.SlashCommandBuilder()
        .setName('timedcmd')
        .setDescription('Schedule a command to run at a specified time')
        .addStringOption(option => option.setName('group')
        .setDescription('The name of the command group')
        .setRequired(true))
        .addStringOption(option => option.setName('cron')
        .setDescription('Cron expression for scheduling the command (e.g., "0 * * * *" for every hour)')
        .setRequired(true))
        .toJSON(); // Convert to ApplicationCommandDataResolvable
    try {
        // Register the command with client.application.commands
        yield client.application.commands.set([command]); // Pass the array containing the single command
        console.log('timedcmd command registered successfully.');
    }
    catch (error) {
        console.error('Error registering timedcmd command:', error);
    }
    return command; // Return a single command, not an array
});
exports.registerTimedCmd = registerTimedCmd;
