import { Client } from 'discord.js';
import { CommandsHandler, EventsHandler } from './core';
import { token, eventsPath, commandsPath, presence, prefix } from './constants';

const client: Client = new Client({ presence });

const events: EventsHandler = new EventsHandler(client);
events.load(eventsPath);

const commands: CommandsHandler = new CommandsHandler(client, prefix);
commands.load(commandsPath);

void client.login(token);
