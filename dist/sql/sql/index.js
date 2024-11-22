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
exports.registerGPCommands = void 0;
const cmdgroup_delete_1 = require("../commands/cmdgroup-delete");
const cmdadd_1 = require("../commands/cmdadd");
const timedcmd_1 = require("../commands/timedcmd");
const cmdgroup_add_1 = require("../commands/cmdgroup-add");
// Adjust the parameter type to use Client from Discord.js v14
const registerGPCommands = (client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Access the commands property directly from the client for registration
        const commands = (_a = client.application) === null || _a === void 0 ? void 0 : _a.commands;
        if (!commands) {
            console.error('No commands manager found.');
            return;
        }
        // Register all the commands
        yield (0, cmdgroup_delete_1.registerCmdGroupDelete)(client); // Pass client to functions
        yield (0, cmdgroup_add_1.registerCmdGroupAdd)(client); // Pass client to functions
        yield (0, cmdadd_1.registerCmdAdd)(client); // Pass client to functions
        yield (0, cmdgroup_delete_1.registerCmdGroupDelete)(client); // Pass client to functions
        yield (0, timedcmd_1.registerTimedCmd)(client); // Pass client to functions
        console.log('All GP-related commands have been registered.');
    }
    catch (error) {
        console.error('Error registering GP commands:', error);
    }
});
exports.registerGPCommands = registerGPCommands;
