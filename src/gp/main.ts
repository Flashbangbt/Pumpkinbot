import { rce } from '../bot';
import { onPlayerJoin } from './player-joined';
import { onPlayerLeave } from './player-left';
import { onPlayerKill } from './player-kill';
import { RCEEvent, PlayerJoinedEventPayload, PlayerLeftEventPayload, PlayerKillEventPayload } from 'rce.js';

export const setupAllListeners = () => {
  // Listen for the player-joined event
  rce.events.on(RCEEvent.PlayerJoined, (payload: PlayerJoinedEventPayload) => {
    const { server, ign } = payload;

    if (!server) {
      console.error('Server is undefined in player-joined event payload!');
      return;
    }

    console.log(`${ign} joined ${server.identifier}`);
    onPlayerJoin(server.identifier, ign);
  });

  // Listen for the player-left event
  rce.events.on(RCEEvent.PlayerLeft, (payload: PlayerLeftEventPayload) => {
    const { server, ign } = payload;

    if (!server) {
      console.error('Server is undefined in player-left event payload!');
      return;
    }

    console.log(`${ign} left ${server.identifier}`);
    onPlayerLeave(server.identifier, ign);
  });

  // Listen for the player-kill event
  rce.events.on(RCEEvent.PlayerKill, (payload: PlayerKillEventPayload) => {
    const { server, victim, killer } = payload;

    if (!server) {
      console.error('Server is undefined in player-kill event payload!');
      return;
    }

    if (!killer || !victim) {
      console.error('Killer or victim data is missing in player-kill event payload!');
      return;
    }

    console.log(`${killer.name} killed ${victim.name} in ${server.identifier}`);
    onPlayerKill(server.identifier, killer.name, victim.name);
  });

  console.log('All RCE listeners have been set up.');
};
