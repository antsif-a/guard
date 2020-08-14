import { Client } from 'discord.js';
import { token, presence } from './constants';

const client: Client = new Client({ presence });

void client.login(token);
