import Database from 'better-sqlite3';

// Initialize the database connection (make sure the database file exists)
const db = new Database('./database.db', { verbose: console.log });

// Create the table to store command groups if it doesn't already exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS command_groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_name TEXT UNIQUE NOT NULL
  )
`).run();

// Create the table to store commands associated with command groups
db.prepare(`
  CREATE TABLE IF NOT EXISTS commands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    command_name TEXT UNIQUE NOT NULL,
    group_id INTEGER,
    FOREIGN KEY (group_id) REFERENCES command_groups(id)
  )
`).run();

// Define the type for a command group
interface CommandGroup {
  command_name: any;
  id: number;
  group_name: string;
}

// Function to insert a new command group into the database
export function insertCommandGroup(groupName: string) {
  try {
    const stmt = db.prepare('INSERT INTO command_groups (group_name) VALUES (?)');
    stmt.run(groupName);
    console.log(`Command group "${groupName}" added to the database.`);
  } catch (error) {
    console.error('Error inserting command group into database:', error);
    throw error;
  }
}

// Function to insert a command into a specific group
export function insertCommandToGroup(commandName: string, groupName: string) {
  try {
    // Get the group ID based on the group name
    const groupStmt = db.prepare('SELECT id FROM command_groups WHERE group_name = ?');
    const group = groupStmt.get(groupName) as CommandGroup; // Cast the result to CommandGroup type
    if (!group) {
      throw new Error(`Group "${groupName}" not found.`);
    }

    // Insert the command into the specified group
    const stmt = db.prepare('INSERT INTO commands (command_name, group_id) VALUES (?, ?)');
    stmt.run(commandName, group.id);
    console.log(`Command "${commandName}" added to group "${groupName}".`);
  } catch (error) {
    console.error('Error inserting command into group:', error);
    throw error;
  }
}

// Function to get all command groups from the database
export function getCommandGroups(groupName: string) {
  try {
    const stmt = db.prepare('SELECT * FROM command_groups');
    const groups = stmt.all() as CommandGroup[]; // Cast to an array of CommandGroup objects
    return groups;
  } catch (error) {
    console.error('Error fetching command groups from database:', error);
    throw error;
  }
}

// Function to delete a command from a specific group by command name
export function deleteCommandFromGroup(commandName: string) {
  try {
    // Delete the command from the database
    const stmt = db.prepare('DELETE FROM commands WHERE command_name = ?');
    const result = stmt.run(commandName);

    if (result.changes === 0) {
      throw new Error(`Command "${commandName}" not found.`);
    }

    console.log(`Command "${commandName}" deleted from the database.`);
  } catch (error) {
    console.error('Error deleting command from group:', error);
    throw error;
  }
}

// Function to delete a command group by its name
export function deleteCommandGroup(groupName: string) {
  try {
    // Delete all commands associated with the group first (to avoid foreign key constraint errors)
    const deleteCommandsStmt = db.prepare('DELETE FROM commands WHERE group_id = (SELECT id FROM command_groups WHERE group_name = ?)');
    deleteCommandsStmt.run(groupName);

    // Now delete the group itself
    const stmt = db.prepare('DELETE FROM command_groups WHERE group_name = ?');
    const result = stmt.run(groupName);

    if (result.changes === 0) {
      throw new Error(`Group "${groupName}" not found.`);
    }

    console.log(`Command group "${groupName}" deleted successfully.`);
  } catch (error) {
    console.error('Error deleting command group from database:', error);
    throw error;
  }
}

export default db; // Export the database instance
