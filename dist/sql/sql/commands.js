"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommandFromGroup = exports.getCommandsFromGroup = exports.insertCommandToGroup = void 0;
const database_init_1 = __importDefault(require("./database-init"));
const insertCommandToGroup = (commandName, groupName) => {
    try {
        const groupStmt = database_init_1.default.prepare('SELECT id FROM command_groups WHERE group_name = ?');
        const group = groupStmt.get(groupName);
        if (!group) {
            throw new Error(`Group "${groupName}" not found.`);
        }
        const stmt = database_init_1.default.prepare('INSERT INTO commands (command_name, group_id) VALUES (?, ?)');
        stmt.run(commandName, group.id);
        console.log(`Command "${commandName}" added to group "${groupName}".`);
    }
    catch (error) {
        console.error('Error inserting command into group:', error);
        throw error;
    }
};
exports.insertCommandToGroup = insertCommandToGroup;
const getCommandsFromGroup = (groupName) => {
    try {
        const stmt = database_init_1.default.prepare('SELECT command_name FROM commands WHERE group_id = (SELECT id FROM command_groups WHERE group_name = ?)');
        const commands = stmt.all(groupName);
        return commands;
    }
    catch (error) {
        console.error('Error fetching commands from group:', error);
        throw error;
    }
};
exports.getCommandsFromGroup = getCommandsFromGroup;
const deleteCommandFromGroup = (commandName) => {
    if (!commandName || typeof commandName !== 'string') {
        throw new Error('Invalid command name provided.');
    }
    try {
        const stmt = database_init_1.default.prepare('DELETE FROM commands WHERE command_name = ?');
        const result = stmt.run(commandName);
        if (result.changes === 0) {
            throw new Error(`Command "${commandName}" not found.`);
        }
        console.log(`Command "${commandName}" successfully deleted from the database.`);
        return true;
    }
    catch (error) {
        console.error('Error deleting command from group:', error);
        throw error;
    }
};
exports.deleteCommandFromGroup = deleteCommandFromGroup;
