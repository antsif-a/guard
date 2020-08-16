import { Client } from 'discord.js';
import { EventsHandler } from './core';
import { token, presence } from './constants';
import * as path from 'path';

const client: Client = new Client({ presence });
const events: EventsHandler = new EventsHandler(client);

events.load(path.join(__dirname, 'events'));

void client.login(token);
