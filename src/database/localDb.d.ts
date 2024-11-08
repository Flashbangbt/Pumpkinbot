// src/localDb.d.ts

export interface Player {
  name: string;
  team: string;
  zone_size: string;
  position: string;
  zone_name?: string;
}

export interface Data {
  players: Player[];
}

export function readData(): Data;
export function writeData(data: Data): void;
export function addOrUpdatePlayer(playerName: string, team: string, zoneSize: string, position: string, zoneName?: string): void;
export function isPlayerInTeam(playerName: string): boolean;
