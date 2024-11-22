"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAllListeners = void 0;
const bot_1 = require("../bot");
const player_joined_1 = require("./player-joined");
const player_left_1 = require("./player-left");
const player_kill_1 = require("./player-kill");
const rce_js_1 = require("rce.js");
const setupAllListeners = () => {
    // Listen for the player-joined event
    bot_1.rce.events.on(rce_js_1.RCEEvent.PlayerJoined, (payload) => {
        const { server, ign } = payload;
        if (!server) {
            console.error('Server is undefined in player-joined event payload!');
            return;
        }
        console.log(`${ign} joined ${server.identifier}`);
        (0, player_joined_1.onPlayerJoin)(server.identifier, ign);
    });
    // Listen for the player-left event
    bot_1.rce.events.on(rce_js_1.RCEEvent.PlayerLeft, (payload) => {
        const { server, ign } = payload;
        if (!server) {
            console.error('Server is undefined in player-left event payload!');
            return;
        }
        console.log(`${ign} left ${server.identifier}`);
        (0, player_left_1.onPlayerLeave)(server.identifier, ign);
    });
    // Listen for the player-kill event
    bot_1.rce.events.on(rce_js_1.RCEEvent.PlayerKill, (payload) => {
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
        (0, player_kill_1.onPlayerKill)(server.identifier, killer.name, victim.name);
    });
    console.log('All RCE listeners have been set up.');
};
exports.setupAllListeners = setupAllListeners;
