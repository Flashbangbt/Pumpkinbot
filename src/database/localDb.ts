import * as fs from 'fs';
import * as path from 'path';

// Define the shape of the database
interface Player {
  name: string;
  team: string | null;
  isTeamLeader: boolean;
  zoneSize: string;
  position: string;
}

interface Team {
  id: string;
  name: string;
  leader: string;
  members: string[];
}

// The data will be stored as an object (you can replace this with a real database in the future)
let localDb = {
  players: [] as Player[],
  teams: [] as Team[],
};

// Path to the local database file (you could also use JSON file to persist data)
const dbFilePath = path.resolve(__dirname, 'localDb.json');

// Load the data from the local file
function loadDb() {
  if (fs.existsSync(dbFilePath)) {
    const rawData = fs.readFileSync(dbFilePath, 'utf-8');
    localDb = JSON.parse(rawData);
  }
}

// Save the data back to the local file
function saveDb() {
  fs.writeFileSync(dbFilePath, JSON.stringify(localDb, null, 2), 'utf-8');
}

// Read player data from the local database
export function readData() {
  loadDb();  // Ensure the latest data is loaded
  return localDb;
}

// Add or update player data in the local database
export function addOrUpdatePlayer(playerName: string, teamId: string | null, zoneSize: string, position: string) {
  loadDb();  // Ensure the latest data is loaded

  let player = localDb.players.find(p => p.name === playerName);
  if (!player) {
    // Create a new player entry if not found
    player = {
      name: playerName,
      team: teamId,
      isTeamLeader: false,
      zoneSize,
      position,
    };
    localDb.players.push(player);
  } else {
    // Update existing player data
    player.team = teamId;
    player.zoneSize = zoneSize;
    player.position = position;
  }

  saveDb();  // Save changes to file
}

// Check if the player is a team leader
export function isTeamLeader(playerName: string): boolean {
  loadDb();
  const player = localDb.players.find(p => p.name === playerName);
  if (player && player.team) {
    const team = localDb.teams.find(t => t.id === player.team);
    return team ? team.leader === playerName : false;
  }
  return false;
}

// Add a new team
export function addTeam(teamName: string, leaderName: string) {
  loadDb();  // Ensure the latest data is loaded

  const newTeam: Team = {
    id: `${localDb.teams.length + 1}`,  // Generate a new team ID
    name: teamName,
    leader: leaderName,
    members: [leaderName],
  };

  localDb.teams.push(newTeam);
  saveDb();
}

// Add a player to a team
export function addPlayerToTeam(playerName: string, teamId: string) {
  loadDb();  // Ensure the latest data is loaded

  const team = localDb.teams.find(t => t.id === teamId);
  const player = localDb.players.find(p => p.name === playerName);

  if (team && player && !team.members.includes(playerName)) {
    team.members.push(playerName);
    saveDb();
  }
}

// Get team information
export function getTeamInfo(teamId: string): Team | undefined {
  loadDb();  // Ensure the latest data is loaded
  return localDb.teams.find(t => t.id === teamId);
}

