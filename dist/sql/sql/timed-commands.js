"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimedCommands = exports.insertTimedCommand = void 0;
const database_init_1 = __importDefault(require("./database-init"));
const insertTimedCommand = (groupName, cronExpression) => {
    try {
        const stmt = database_init_1.default.prepare('INSERT INTO timed_commands (group_name, cron_expression) VALUES (?, ?)');
        const result = stmt.run(groupName, cronExpression);
        return Number(result.lastInsertRowid);
    }
    catch (error) {
        console.error('Error inserting timed command:', error);
        throw error;
    }
};
exports.insertTimedCommand = insertTimedCommand;
const getTimedCommands = () => {
    try {
        const stmt = database_init_1.default.prepare('SELECT * FROM timed_commands');
        return stmt.all();
    }
    catch (error) {
        console.error('Error fetching timed commands:', error);
        throw error;
    }
};
exports.getTimedCommands = getTimedCommands;
