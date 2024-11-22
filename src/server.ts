
import { client } from './bot';
import express from 'express';
import { watch } from 'fs';
import { exec } from 'child_process';

const app = express();

// Watch for file changes in the src directory
watch('./src', { recursive: true }, (eventType, filename) => {
    console.log(`File ${filename} changed, recompiling...`);
    exec('tsc', (error, stdout, stderr) => {
        if (error) {
            console.error(`Compilation error: ${error}`);
            return;
        }
        console.log('Recompiled successfully');
    });
});

app.get('/', (req, res) => {
    res.send('PumpkinBot is running!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

client.login(process.env.BOT_TOKEN);
