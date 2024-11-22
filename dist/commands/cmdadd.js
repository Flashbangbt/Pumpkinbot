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
const cmdAddCommand = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('cmdadd')
        .setDescription('Add a command to a command group.'),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Executing cmdadd command...');
                const groups = yield (0, Database_1.getCommandGroups)();
                console.log('Fetched groups in command:', groups);
                if (!groups || groups.length === 0) {
                    yield interaction.reply({
                        content: 'No command groups found. Please create a group first.',
                        ephemeral: true
                    });
                    return;
                }
                const select = new discord_js_1.StringSelectMenuBuilder()
                    .setCustomId('group-select')
                    .setPlaceholder('Select a command group')
                    .addOptions(groups.map(group => {
                    console.log('Processing group:', group);
                    return {
                        label: group.name || group.group_name,
                        value: group.name || group.group_name,
                        description: `Add command to ${group.name || group.group_name}`
                    };
                }));
                const row = new discord_js_1.ActionRowBuilder()
                    .addComponents(select);
                yield interaction.reply({
                    content: 'Select a command group:',
                    components: [row],
                    ephemeral: true
                });
            }
            catch (error) {
                console.error('Error creating dropdown:', error);
                yield interaction.reply({
                    content: 'Failed to load command groups. Please try again.',
                    ephemeral: true
                });
            }
        });
    },
    registerCommand() {
        return this.data.toJSON();
    }
};
exports.default = cmdAddCommand;
