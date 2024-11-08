const { addOrUpdatePlayer, isPlayerInTeam } = require('./src/localDb');

// Command-line input handling
const command = process.argv[2];
const playerName = process.argv[3];
const team = process.argv[4];
const zoneSize = process.argv[5];
const position = process.argv[6];

if (command === 'add' && playerName && team && zoneSize && position) {
    if (!isPlayerInTeam(playerName)) {
        addOrUpdatePlayer(playerName, team, zoneSize, position);
        console.log(`Player ${playerName} added to team ${team} with zone size ${zoneSize} at position ${position}`);
    } else {
        console.log(`Player ${playerName} is already in a team.`);
    }
} else {
    console.log('Invalid command or missing parameters. Usage: add <playerName> <team> <zoneSize> <position>');
}
