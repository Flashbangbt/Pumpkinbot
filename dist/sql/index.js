"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommandGroup = exports.initDB = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const db = (0, better_sqlite3_1.default)('database.db'); // Database file path
// Function to initialize the database schema for command groups
const initDB = () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS command_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      group_name TEXT NOT NULL UNIQUE
    );
  `;
    db.prepare(createTableQuery).run();
};
exports.initDB = initDB;
// Function to add a new command group to the database
const addCommandGroup = (groupName) => {
    const insertQuery = `
    INSERT INTO command_groups (group_name)
    VALUES (?);
  `;
    try {
        db.prepare(insertQuery).run(groupName);
        console.log(`Command group "${groupName}" added to the database.`);
    }
    catch (error) {
        console.error(`Error adding command group: ${error}`);
    }
};
exports.addCommandGroup = addCommandGroup;
// Initialize the database on startup
(0, exports.initDB)();
exports.default = db;
