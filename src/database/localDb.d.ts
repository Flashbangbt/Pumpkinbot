// This file defines types for your local database

export interface PlayerData {
  id: string;
  name: string;
  team: string;
}

export const localDb: {
  getPlayerTeam: (playerId: string) => Promise<string>;
};