import db from './database-init';
import { CommandGroup, GroupResult } from './types';

export const getCommandGroups = (): CommandGroup[] => {
    try {
        console.log('Starting to fetch command groups...');
        const stmt = db.prepare('SELECT id, group_name FROM command_groups');
        const groups = stmt.all() as CommandGroup[];
        console.log('Retrieved groups:', groups);
        return groups;
    } catch (error) {
        console.error('Error fetching command groups:', error);
        throw error;
    }
};

export const insertCommandGroup = (groupName: string): number => {
    try {
        if (!groupName.trim()) {
            throw new Error('Group name cannot be empty.');
        }

        const checkStmt = db.prepare('SELECT id FROM command_groups WHERE group_name = ?');
        const existing = checkStmt.get(groupName) as GroupResult | undefined;
        
        if (existing) {
            return existing.id;
        }

        const stmt = db.prepare('INSERT INTO command_groups (group_name) VALUES (?)');
        const result = stmt.run(groupName);
        const lastInsertId = Number(result.lastInsertRowid);
        console.log(`Command group "${groupName}" added to the database.`);
        return lastInsertId;
    } catch (error: any) {
        console.error('Error inserting command group into database:', error);
        throw error;
    }
};

export const deleteCommandGroup = (groupName: string): boolean => {
    try {
        const deleteCommandsStmt = db.prepare('DELETE FROM commands WHERE group_id = (SELECT id FROM command_groups WHERE group_name = ?)');
        deleteCommandsStmt.run(groupName);

        const stmt = db.prepare('DELETE FROM command_groups WHERE group_name = ?');
        const result = stmt.run(groupName);

        if (result.changes === 0) {
            throw new Error(`Group "${groupName}" not found.`);
        }

        console.log(`Command group "${groupName}" deleted successfully.`);
        return true;
    } catch (error) {
        console.error('Error deleting command group from database:', error);
        throw error;
    }
};

export const getCommandGroupsWithCommands = (): CommandGroup[] => {
    try {
        const stmt = db.prepare('SELECT command_groups.group_name, command_groups.id, commands.command_name FROM command_groups LEFT JOIN commands ON command_groups.id = commands.group_id');
        const groups = stmt.all() as CommandGroup[];
        return groups;
    } catch (error) {
        console.error('Error fetching command groups with commands:', error);
        throw error;
    }
};
