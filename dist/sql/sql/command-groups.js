"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandGroupsWithCommands = exports.deleteCommandGroup = exports.insertCommandGroup = exports.getCommandGroups = void 0;
const database_init_1 = __importDefault(require("./database-init"));
const getCommandGroups = () => {
    try {
        console.log('Starting to fetch command groups...');
        const stmt = database_init_1.default.prepare('SELECT id, group_name FROM command_groups');
        const groups = stmt.all();
        console.log('Retrieved groups:', groups);
        return groups;
    }
    catch (error) {
        console.error('Error fetching command groups:', error);
        throw error;
    }
};
exports.getCommandGroups = getCommandGroups;
const insertCommandGroup = (groupName) => {
    try {
        if (!groupName.trim()) {
            throw new Error('Group name cannot be empty.');
        }
        const checkStmt = database_init_1.default.prepare('SELECT id FROM command_groups WHERE group_name = ?');
        const existing = checkStmt.get(groupName);
        if (existing) {
            return existing.id;
        }
        const stmt = database_init_1.default.prepare('INSERT INTO command_groups (group_name) VALUES (?)');
        const result = stmt.run(groupName);
        const lastInsertId = Number(result.lastInsertRowid);
        console.log(`Command group "${groupName}" added to the database.`);
        return lastInsertId;
    }
    catch (error) {
        console.error('Error inserting command group into database:', error);
        throw error;
    }
};
exports.insertCommandGroup = insertCommandGroup;
const deleteCommandGroup = (groupName) => {
    try {
        const deleteCommandsStmt = database_init_1.default.prepare('DELETE FROM commands WHERE group_id = (SELECT id FROM command_groups WHERE group_name = ?)');
        deleteCommandsStmt.run(groupName);
        const stmt = database_init_1.default.prepare('DELETE FROM command_groups WHERE group_name = ?');
        const result = stmt.run(groupName);
        if (result.changes === 0) {
            throw new Error(`Group "${groupName}" not found.`);
        }
        console.log(`Command group "${groupName}" deleted successfully.`);
        return true;
    }
    catch (error) {
        console.error('Error deleting command group from database:', error);
        throw error;
    }
};
exports.deleteCommandGroup = deleteCommandGroup;
const getCommandGroupsWithCommands = () => {
    try {
        const stmt = database_init_1.default.prepare('SELECT command_groups.group_name, command_groups.id, commands.command_name FROM command_groups LEFT JOIN commands ON command_groups.id = commands.group_id');
        const groups = stmt.all();
        return groups;
    }
    catch (error) {
        console.error('Error fetching command groups with commands:', error);
        throw error;
    }
};
exports.getCommandGroupsWithCommands = getCommandGroupsWithCommands;
