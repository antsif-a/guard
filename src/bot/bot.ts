import { Client } from 'discord.js';
import { token, defaultPrefix, commandsPath, eventsPath, presence } from 'bot/constants';
import { CommandsHandler } from 'core/commands';
import { EventsHandler } from 'core/events';

export class GuardBot {
    static instance: GuardBot;

    client: Client;
    commands: CommandsHandler;
    events: EventsHandler;

    constructor() {
        // Do not allow to create second instance
        if (GuardBot.instance) return GuardBot.instance;

        GuardBot.instance = this;
        this.init();
        this.load();
        this.start();
    }

    private init(): void {
        this.client = new Client({ presence });
        this.commands = new CommandsHandler(this.client, defaultPrefix);
        this.events = new EventsHandler(this.client);
    }

    private load(): void {
        this.commands.load(commandsPath);
        this.commands.setPermissionsAlert((message, command) => {
            return `You can't use ${message.content[0]}${command.name} command!`;
        })
        this.events.load(eventsPath);
    }

    private start(): void {
        void this.client.login(token);
    }

    static get commands(): CommandsHandler {
        return this.instance.commands;
    }

    static get events(): EventsHandler {
        return this.instance.events;
    }
}
