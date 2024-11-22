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
exports.onPlayerLeave = void 0;
const bot_1 = require("../bot"); // Import the initialized RCEManager from bot.ts
const onPlayerLeave = (serverIdentifier, ign) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve the server directly using RCEManager
        const server = bot_1.rce.servers.get(serverIdentifier);
        if (!server) {
            console.error(`Server with identifier "${serverIdentifier}" not found!`);
            return;
        }
        // Construct the leave message
        const message = `${ign} has left the game!`;
        console.log(`Sending leave message to G-Portal: ${message}`);
        // Send the command to the server
        yield bot_1.rce.servers.command(server.identifier, `say ${message}`);
    }
    catch (error) {
        console.error(`Error handling player leave: ${error}`);
    }
});
exports.onPlayerLeave = onPlayerLeave;