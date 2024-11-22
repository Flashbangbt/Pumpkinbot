"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const app = (0, express_1.default)();
// Watch for file changes in the src directory
(0, fs_1.watch)('./src', { recursive: true }, (eventType, filename) => {
    console.log(`File ${filename} changed, recompiling...`);
    (0, child_process_1.exec)('tsc', (error, stdout, stderr) => {
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
bot_1.client.login(process.env.BOT_TOKEN);
