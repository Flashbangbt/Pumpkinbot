
import { Client, ApplicationCommandDataResolvable, CommandInteraction, CacheType, TextChannel, Interaction } from 'discord.js';
import cmdCommand from '../commands/cmd';
import sayCommand from '../commands/say';
import cmdDelete from '../commands/cmd-delete';
import cmdAddCommand from '../commands/cmdadd';
import cmdGroupAddCommand from '../commands/cmdgroup-add';
import cmdGroupDeleteCommand from '../commands/cmdgroup-delete';
import timedCmd from '../commands/timedcmd';
export function setupEventHandlers(client: Client) {
    client.on('interactionCreate', async (interaction: Interaction) => {
        if (!interaction.isCommand()) return;

        const cmdInteraction = interaction as CommandInteraction<CacheType>;
        console.log(`Received command: ${cmdInteraction.commandName}`);

        try {
            switch (cmdInteraction.commandName) {
                case 'cmd':
                    await cmdCommand.execute(cmdInteraction);
                    break;
                case 'say':
                    await sayCommand.execute(cmdInteraction);
                    break;
                case 'cmd-delete':
                    await cmdDelete.execute(cmdInteraction);
                    break;
                case 'cmdadd':
                    await cmdAddCommand.execute(cmdInteraction);
                    break;
                case 'cmdgroup-add':
                    await cmdGroupAddCommand.execute(cmdInteraction);
                    break;
                case 'cmd-group-delete':
                    await cmdGroupDeleteCommand.execute(cmdInteraction);
                    break;
                case 'timedcmd':
                    await timedCmd.execute(cmdInteraction);
                    break;
                default:
                    await cmdInteraction.reply({ content: 'Unknown command!', ephemeral: true });
            }
        } catch (error) {
            console.error('Error executing command:', error);
            await cmdInteraction.reply({ content: 'An error occurred while executing this command.', ephemeral: true });
        }
    });
}

export const registerAllCommands = async (client: Client): Promise<ApplicationCommandDataResolvable[]> => {
    const commands: ApplicationCommandDataResolvable[] = [
        cmdCommand.registerCommand(),
        sayCommand.registerCommand(),
        cmdDelete.registerCommand(),
        cmdAddCommand.registerCommand(),
        cmdGroupAddCommand.registerCommand(),
        cmdGroupDeleteCommand.registerCommand(),
        timedCmd.registerCommand(),
    ];

    
    
    try {
        await client.application?.commands.set(commands);
        console.log('Commands registered successfully');
        
        const channel = client.channels.cache.get('1308880384360058971') as TextChannel;
        if (channel) {
            await channel.send('Commands have been registered:');
            for (const command of commands) {
                if ('name' in command) {
                    await channel.send(`/${command.name}`);
                }
            }
        }
    } catch (error) {
        console.error('Failed to register commands:', error);
        throw error;
    }

    return commands;
};

export const initializeCommands = async (client: Client) => {
    console.log('Starting command initialization...');
    setupEventHandlers(client);
    await registerAllCommands(client);
    console.log('Command initialization complete');
};
