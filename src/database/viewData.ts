import { localDb } from './database/localDb';  // Correct path

export const readData = async (playerId: string) => {
  const playerTeam = await localDb.getPlayerTeam(playerId);
  return playerTeam;
};
