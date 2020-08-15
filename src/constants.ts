import { config } from 'dotenv';
import { PresenceData } from 'discord.js';

config();

export const token = process.env._TOKEN;
export const dev = process.env._DEV;

export const prefix = '$';

export const presence: PresenceData = {
    activity: {
        type: 'PLAYING',
        name: `Prefix: ${prefix}`
    }
};
