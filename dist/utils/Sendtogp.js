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
exports.sendToGPortal = sendToGPortal;
// gportal-utils.ts
const bot_1 = require("../bot"); // Ensure you import rce (or whatever object provides G-Portal interaction)
// Function to send a command to G-Portal server
function sendToGPortal(serverName, commandText) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Send the command to the specified G-Portal server
            yield bot_1.rce.servers.command(serverName, `${commandText}`);
            console.log(`Command sent to G-Portal: ${commandText}`);
            return true; // Indicate success
        }
        catch (error) {
            console.error('Error sending command to G-Portal:', error);
            throw new Error('There was an error sending the command to G-Portal.');
        }
    });
}
