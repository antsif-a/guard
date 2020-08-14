import { config } from 'dotenv';

config();

export const token = process.env.TOKEN;
export const prefix = '$';