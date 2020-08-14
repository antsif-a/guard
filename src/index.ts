import { Client } from 'discord.js';
import { token } from './constants';

const client: Client = new Client();

void client.login(token);
