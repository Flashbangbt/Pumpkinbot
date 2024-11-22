import db from './database-init';
import { TimedCommand } from './types';

export const insertTimedCommand = (groupName: string, cronExpression: string): number => {
    try {
        const stmt = db.prepare('INSERT INTO timed_commands (group_name, cron_expression) VALUES (?, ?)');
        const result = stmt.run(groupName, cronExpression);
        return Number(result.lastInsertRowid);
    } catch (error) {
        console.error('Error inserting timed command:', error);
        throw error;
    }
};

export const getTimedCommands = (): TimedCommand[] => {
    try {
        const stmt = db.prepare('SELECT * FROM timed_commands');
        return stmt.all() as TimedCommand[];
    } catch (error) {
        console.error('Error fetching timed commands:', error);
        throw error;
    }
};
