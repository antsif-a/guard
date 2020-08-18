import { config } from 'dotenv';
import { PresenceData } from 'discord.js';

config();

/**
 * Bot token.
 * @constant
 */
export const token = process.env._TOKEN;

/**
 * Whether dev mode is enabled or not.
 * @constant
 */
export const dev = process.env._DEV;

/**
 * Bot's default prefix.
 * @constant
 */
export const prefix = '$';

/**
 * Rich presence of bot.
 * @constant
 */
export const presence: PresenceData = {
    activity: {
        type: 'PLAYING',
        name: `Prefix: ${prefix}`
    }
};

/**
 * All terminal colors. 
 */
export class Colors {
    public static black = "\x1b[30m";
    public static red = "\x1b[31m";
    public static green = "\x1b[32m";
    public static yellow = "\x1b[33m";
    public static blue = "\x1b[34m";
    public static magenta = "\x1b[35m";
    public static cyan = "\x1b[36m";
    public static white = "\x1b[37m";
    public static crimson = "\x1b[38m";
}

/**
 * All terminal formats.
 */
export class Formats {
    public static reset = "\x1b[0m";
    public static bright = "\x1b[1m";
    public static dim = "\x1b[2m";
    public static underscore = "\x1b[4m";
    public static blink = "\x1b[5m";
    public static reverse = "\x1b[7m";
    public static hidden = "\x1b[8m";
}