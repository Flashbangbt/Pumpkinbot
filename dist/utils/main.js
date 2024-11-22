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
exports.initializeCommands = exports.registerAllCommands = void 0;
exports.setupEventHandlers = setupEventHandlers;
const cmd_1 = __importDefault(require("../commands/cmd"));
const say_1 = __importDefault(require("../commands/say"));
const cmd_delete_1 = __importDefault(require("../commands/cmd-delete"));
const cmdadd_1 = __importDefault(require("../commands/cmdadd"));
const cmdgroup_add_1 = __importDefault(require("../commands/cmdgroup-add"));
const cmdgroup_delete_1 = __importDefault(require("../commands/cmdgroup-delete"));
const timedcmd_1 = __importDefault(require("../commands/timedcmd"));
function setupEventHandlers(client) {
    client.on('interactionCreate', (interaction) => __awaiter(this, void 0, void 0, function* () {
        if (!interaction.isCommand())
            return;
        const cmdInteraction = interaction;
        console.log(`Received command: ${cmdInteraction.commandName}`);
        try {
            switch (cmdInteraction.commandName) {
                case 'cmd':
                    yield cmd_1.default.execute(cmdInteraction);
                    break;
                case 'say':
                    yield say_1.default.execute(cmdInteraction);
                    break;
                case 'cmd-delete':
                    yield cmd_delete_1.default.execute(cmdInteraction);
                    break;
                case 'cmdadd':
                    yield cmdadd_1.default.execute(cmdInteraction);
                    break;
                case 'cmdgroup-add':
                    yield cmdgroup_add_1.default.execute(cmdInteraction);
                    break;
                case 'cmd-group-delete':
                    yield cmdgroup_delete_1.default.execute(cmdInteraction);
                    break;
                case 'timedcmd':
                    yield timedcmd_1.default.execute(cmdInteraction);
                    break;
                default:
                    yield cmdInteraction.reply({ content: 'Unknown command!', ephemeral: true });
            }
        }
        catch (error) {
            console.error('Error executing command:', error);
            yield cmdInteraction.reply({ content: 'An error occurred while executing this command.', ephemeral: true });
        }
    }));
}
const registerAllCommands = (client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const commands = [
        cmd_1.default.registerCommand(),
        say_1.default.registerCommand(),
        cmd_delete_1.default.registerCommand(),
        cmdadd_1.default.registerCommand(),
        cmdgroup_add_1.default.registerCommand(),
        cmdgroup_delete_1.default.registerCommand(),
        timedcmd_1.default.registerCommand(),
    ];
    try {
        yield ((_a = client.application) === null || _a === void 0 ? void 0 : _a.commands.set(commands));
        console.log('Commands registered successfully');
        const channel = client.channels.cache.get('1308880384360058971');
        if (channel) {
            yield channel.send('Commands have been registered:');
            for (const command of commands) {
                if ('name' in command) {
                    yield channel.send(`/${command.name}`);
                }
            }
        }
    }
    catch (error) {
        console.error('Failed to register commands:', error);
        throw error;
    }
    return commands;
});
exports.registerAllCommands = registerAllCommands;
const initializeCommands = (client) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Starting command initialization...');
    setupEventHandlers(client);
    yield (0, exports.registerAllCommands)(client);
    console.log('Command initialization complete');
});
exports.initializeCommands = initializeCommands;
