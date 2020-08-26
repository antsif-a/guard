import { CommandsHandler, EventsHandler } from '../core';
import { Client } from 'discord.js';
import { token, prefix, commandsPath, eventsPath } from '../constants';

export class GuardBot {
    static bot: GuardBot;

    client: Client;
    commands: CommandsHandler;
    events: EventsHandler;

    constructor() {
        // Do not allow to create second instance
        if (GuardBot.bot) return GuardBot.bot;

        GuardBot.bot = this;
        this.init();
        this.load();
        this.start();
    }

    private init(): void {
        this.client = new Client();
        this.commands = new CommandsHandler(this.client, prefix);
        this.events = new EventsHandler(this.client);
    }

    private load(): void {
        this.commands.load(commandsPath);
        this.events.load(eventsPath);
    }

    private start(): void {
        void this.client.login(token);
    }
}