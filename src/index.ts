import { Client } from 'discord.js';
import { EventsHandler } from 'discord-ts-kit';
import { token, presence } from './constants';
import * as path from 'path';

const client: Client = new Client({ presence });
const events: EventsHandler = new EventsHandler(client);

events.loadDir(path.join(__dirname, 'events'));

void client.login(token);
