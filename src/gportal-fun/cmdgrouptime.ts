import fs from 'fs';
import path from 'path';
import cron from 'node-cron';

// Path to the local database (can be a JSON file for simplicity)
const dbPath = path.join(__dirname, 'commandGroups.json');

// Utility function to read the database
function readDatabase() {
    if (fs.existsSync(dbPath)) {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    }
    return { groups: [], scheduledCommands: [] }; // Return empty object if no database exists
}

// Utility function to write to the database
function writeDatabase(data: any) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Add a new command to a group
function addCommand(groupName: string, commandName: string, position: number, command: string) {
    const db = readDatabase();
    const group = db.groups.find((g: any) => g.name === groupName);

    if (!group) {
        // Create a new group if it doesn't exist
        db.groups.push({
            name: groupName,
            commands: [{ name: commandName, position, command }]
        });
    } else {
        // Add the command to the existing group
        group.commands.push({ name: commandName, position, command });
        // Sort by position
        group.commands.sort((a: any, b: any) => a.position - b.position);
    }

    writeDatabase(db);
    console.log(`Command "${commandName}" added to group "${groupName}".`);
}

// Edit an existing command
function editCommand(groupName: string, commandName: string, newCommand: string) {
    const db = readDatabase();
    const group = db.groups.find((g: any) => g.name === groupName);

    if (!group) {
        console.log(`Group "${groupName}" not found.`);
        return;
    }

    const command = group.commands.find((cmd: any) => cmd.name === commandName);
    if (command) {
        command.command = newCommand;
        writeDatabase(db);
        console.log(`Command "${commandName}" in group "${groupName}" has been updated.`);
    } else {
        console.log(`Command "${commandName}" not found in group "${groupName}".`);
    }
}

// List all commands in a group
function listCommands(groupName: string) {
    const db = readDatabase();
    const group = db.groups.find((g: any) => g.name === groupName);

    if (!group) {
        console.log(`Group "${groupName}" not found.`);
        return;
    }

    console.log(`Commands in group "${groupName}":`);
    group.commands.forEach((cmd: any, index: number) => {
        console.log(`${index + 1}. ${cmd.name} (Position: ${cmd.position})`);
    });
}

// Run all commands in a group
function runCommands(groupName: string) {
    const db = readDatabase();
    const group = db.groups.find((g: any) => g.name === groupName);

    if (!group) {
        console.log(`Group "${groupName}" not found.`);
        return;
    }

    console.log(`Running commands in group "${groupName}":`);
    group.commands.forEach((cmd: any) => {
        console.log(`Executing: ${cmd.command}`);
        // Here, you would integrate your execution logic
        // For example: executeCommand(cmd.command);
    });
}

// Delete a command from a group
function deleteCommand(groupName: string, commandName: string) {
    const db = readDatabase();
    const group = db.groups.find((g: any) => g.name === groupName);

    if (!group) {
        console.log(`Group "${groupName}" not found.`);
        return;
    }

    const commandIndex = group.commands.findIndex((cmd: any) => cmd.name === commandName);
    if (commandIndex !== -1) {
        group.commands.splice(commandIndex, 1);
        writeDatabase(db);
        console.log(`Command "${commandName}" deleted from group "${groupName}".`);
    } else {
        console.log(`Command "${commandName}" not found in group "${groupName}".`);
    }
}

// Schedule a command to run at a specific time
function scheduleCommand(groupName: string, commandName: string, cronExpression: string) {
    const db = readDatabase();
    const group = db.groups.find((g: any) => g.name === groupName);

    if (!group) {
        console.log(`Group "${groupName}" not found.`);
        return;
    }

    const command = group.commands.find((cmd: any) => cmd.name === commandName);
    if (command) {
        // Add the scheduled task to the database (optional, for persistence)
        db.scheduledCommands.push({ groupName, commandName, cronExpression });
        writeDatabase(db);

        // Schedule the task using cron
        cron.schedule(cronExpression, () => {
            console.log(`Running scheduled command "${commandName}" in group "${groupName}" at ${cronExpression}.`);
            // Here, you would execute the command (e.g., executeCommand(command.command));
        });

        console.log(`Scheduled command "${commandName}" in group "${groupName}" with cron expression: ${cronExpression}`);
    } else {
        console.log(`Command "${commandName}" not found in group "${groupName}".`);
    }
}

// Example of how to use the above functions:

// Adding a command
addCommand('group1', 'command1', 0, '/run event');

// Scheduling a command (runs every minute)
scheduleCommand('group1', 'command1', '*/1 * * * *');  // Cron format: every minute
