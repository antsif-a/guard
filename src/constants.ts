import { config } from 'dotenv';
import { PresenceData } from 'discord.js';
import * as path from 'path';

config();

//#region Environment variables

/**
 * Bot token.
 * @constant
 */
export const token = process.env.GUARD_TOKEN;

/**
 * Whether dev mode is enabled.
 * Not in use right now.
 * @constant
 */
export const dev = process.env.GUARD_DEV;

//#endregion

//#region Bot

/**
 * Bot's default prefix.
 * @constant
 */
export const defaultPrefix = '$';

/**
 * Path to events folder.
 * @constant
 */
export const eventsPath = path.join(__dirname, 'bot', 'events');

/**
 * Path to commands folder.
 * @constant
 */
export const commandsPath = path.join(__dirname, 'bot', 'commands');

/**
 * Path to database file.
 * @constant
 */
export const databasePath = path.join(__dirname, '..', 'default.db');

/**
 * Rich presence of bot.
 * @constant
 */
export const presence: PresenceData = {
    activity: {
        type: 'PLAYING',
        name: 'with moderators'
    }
};

//#endregion

//#region Utils

/**
 * All terminal colors. 
 */
export class Colors {
    public static black = '\x1b[30m';
    public static red = '\x1b[31m';
    public static green = '\x1b[32m';
    public static yellow = '\x1b[33m';
    public static blue = '\x1b[34m';
    public static magenta = '\x1b[35m';
    public static cyan = '\x1b[36m';
    public static white = '\x1b[37m';
    public static crimson = '\x1b[38m';
}

/**
 * All terminal formats.
 */
export class Formats {
    public static reset = '\x1b[0m';
    public static bright = '\x1b[1m';
    public static dim = '\x1b[2m';
    public static underscore = '\x1b[4m';
    public static blink = '\x1b[5m';
    public static reverse = '\x1b[7m';
    public static hidden = '\x1b[8m';
}

//#endregion
