import { sayCommand } from './discord-commands/say';
import { sendCmd } from './discord-commands/sendcmd';
import { cmdGroupTime } from './gportal-fun/cmdgrouptime';
import { zoneLogic } from './gportal-zonelogic/zonelogic';
import { runCommand } from './gportal-zonelogic/runCommand';
import { CommandInteraction } from 'discord.js'; // Import CommandInteraction

export const handleCommand = async (interaction: CommandInteraction) => {
    // Handling /say command
    if (interaction.commandName === 'say') {
        await sayCommand(interaction, /* pass rce, serverId here if needed */);
    }
    // Handling /sendcmd command
    else if (interaction.commandName === 'sendcmd') {
        await sendCmd(interaction, /* pass rce, serverId here if needed */);
    }
    // Handling /cmdgrouptime command
    else if (interaction.commandName === 'cmdgrouptime') {
        await cmdGroupTime(interaction);
    }
    // Handling /zonecreate command
    else if (interaction.commandName === 'zonecreate') {
        await zoneLogic(interaction);
    }
    // Handling /runcommand command
    else if (interaction.commandName === 'runcommand') {
        await runCommand(interaction);
    }
};
