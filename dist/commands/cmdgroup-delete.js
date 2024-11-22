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
const cmdGroupDeleteCommand = {
    name: 'cmdgroup-delete',
    description: 'Delete a command group.',
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const groupName = (_a = interaction.options.get('name')) === null || _a === void 0 ? void 0 : _a.value;
            try {
                yield (0, Database_1.deleteCommandGroup)(groupName);
                yield interaction.editReply(`Command group "${groupName}" deleted successfully.`);
            }
            catch (error) {
                console.error('Error handling cmdgroup-delete command:', error);
                yield interaction.editReply('There was an error while deleting the command group.');
            }
        });
    },
    registerCommand() {
        return new discord_js_1.SlashCommandBuilder()
            .setName('cmdgroup-delete')
            .setDescription('Delete a command group')
            .addStringOption(option => option.setName('name')
            .setDescription('The name of the command group to delete')
            .setRequired(true))
            .toJSON();
    }
};
exports.default = cmdGroupDeleteCommand;
