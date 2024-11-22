import db from './database-init';
import { CommandGroup } from './types';

export const insertCommandToGroup = (commandName: string, groupName: string) => {
    try {
        const groupStmt = db.prepare('SELECT id FROM command_groups WHERE group_name = ?');
        const group = groupStmt.get(groupName) as CommandGroup;
        if (!group) {
            throw new Error(`Group "${groupName}" not found.`);
        }
        const stmt = db.prepare('INSERT INTO commands (command_name, group_id) VALUES (?, ?)');
        stmt.run(commandName, group.id);
        console.log(`Command "${commandName}" added to group "${groupName}".`);
    } catch (error) {
        console.error('Error inserting command into group:', error);
        throw error;
    }
};

export const getCommandsFromGroup = (groupName: string) => {
    try {
        const stmt = db.prepare('SELECT command_name FROM commands WHERE group_id = (SELECT id FROM command_groups WHERE group_name = ?)');
        const commands = stmt.all(groupName) as { command_name: string }[];
        return commands;
    } catch (error) {
        console.error('Error fetching commands from group:', error);
        throw error;
    }
};

export const deleteCommandFromGroup = (commandName: string): boolean => {
    if (!commandName || typeof commandName !== 'string') {
        throw new Error('Invalid command name provided.');
    }
    try {
        const stmt = db.prepare('DELETE FROM commands WHERE command_name = ?');
        const result = stmt.run(commandName);
        if (result.changes === 0) {
            throw new Error(`Command "${commandName}" not found.`);
        }
        console.log(`Command "${commandName}" successfully deleted from the database.`);
        return true;
    } catch (error) {
        console.error('Error deleting command from group:', error);
        throw error;
    }
};
