
import { CommandInteraction, CacheType, SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, ComponentType } from 'discord.js';
import { getCommandGroups, insertCommandGroup } from '../sql/sql/Database';

const cmdAddCommand = {
    data: new SlashCommandBuilder()
        .setName('cmdadd')
        .setDescription('Add a command to a command group.'),

    async execute(interaction: CommandInteraction<CacheType>) {
        try {
            console.log('Executing cmdadd command...');
            const groups = await getCommandGroups();
            console.log('Fetched groups in command:', groups);
            
            if (!groups || groups.length === 0) {
                await interaction.reply({
                    content: 'No command groups found. Please create a group first.',
                    ephemeral: true
                });
                return;
            }

            const select = new StringSelectMenuBuilder()
                .setCustomId('group-select')
                .setPlaceholder('Select a command group')
                .addOptions(
                    groups.map(group => {
                        console.log('Processing group:', group);
                        return {
                            label: group.name || group.group_name,
                            value: group.name || group.group_name,
                            description: `Add command to ${group.name || group.group_name}`
                        };
                    })
                );

            const row = new ActionRowBuilder<StringSelectMenuBuilder>()
                .addComponents(select);

            await interaction.reply({
                content: 'Select a command group:',
                components: [row],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error creating dropdown:', error);
            await interaction.reply({ 
                content: 'Failed to load command groups. Please try again.',
                ephemeral: true 
            });
        }
    },

    registerCommand() {
        return this.data.toJSON();
    }
};

export default cmdAddCommand;

