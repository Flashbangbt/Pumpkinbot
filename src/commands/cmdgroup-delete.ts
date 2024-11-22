
import { CommandInteraction, CacheType, SlashCommandBuilder, ApplicationCommandDataResolvable } from 'discord.js';
import { deleteCommandGroup } from '../sql/sql/Database';

const cmdGroupDeleteCommand = {
    name: 'cmdgroup-delete',
    description: 'Delete a command group.',

    async execute(interaction: CommandInteraction<CacheType>) {
        const groupName = interaction.options.get('name')?.value as string;

        try {
            await deleteCommandGroup(groupName);
            await interaction.editReply(`Command group "${groupName}" deleted successfully.`);
        } catch (error) {
            console.error('Error handling cmdgroup-delete command:', error);
            await interaction.editReply('There was an error while deleting the command group.');
        }
    },

    registerCommand(): ApplicationCommandDataResolvable {
        return new SlashCommandBuilder()
            .setName('cmdgroup-delete')
            .setDescription('Delete a command group')
            .addStringOption(option =>
                option.setName('name')
                    .setDescription('The name of the command group to delete')
                    .setRequired(true)
            )
            .toJSON();
    }
};

export default cmdGroupDeleteCommand;
