"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rce = exports.serverDetails = void 0;
exports.initializeRCE = initializeRCE;
const rce_js_1 = require("rce.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './profiles/.env' });
let rce = null;
exports.rce = rce;
exports.serverDetails = {
    misfits: {
        serverId: 7041651,
        region: "EU",
        intents: [rce_js_1.RCEIntent.All],
        state: ["solo", "3x"],
    },
};
function initializeRCE() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Initializing RCE...");
        // Ensure credentials are available in the environment
        if (!process.env.RCE_USERNAME || !process.env.RCE_PASSWORD) {
            throw new Error('RCE_USERNAME or RCE_PASSWORD is not defined in the .env file');
        }
        exports.rce = rce = new rce_js_1.RCEManager();
        try {
            // Initialize the RCEManager with credentials from .env
            yield rce.init({
                username: process.env.RCE_USERNAME,
                password: process.env.RCE_PASSWORD,
            }, {
                level: rce_js_1.LogLevel.Info,
                file: 'rce.log',
            });
            console.log("RCE Initialized successfully");
        }
        catch (rceError) {
            console.error("Error initializing RCE:", rceError);
            throw rceError;
        }
        // Ensure the RCEManager is properly initialized
        if (!rce) {
            throw new Error('RCE failed to initialize properly.');
        }
        return rce;
    });
}
