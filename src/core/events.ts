import { Client, ClientEvents } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Client event.
 */
export class Event<K extends keyof ClientEvents> {

    /** Event name. */
    readonly name: K;

    /** Event listener. */
    readonly listener: (client: Client, ...args: ClientEvents[K]) => void;

    /**
     * Event constructor.
     * @param name - Event name.
     * @param listener - Event listener.
     */
    constructor(name: K, listener: (client: Client, ...args: ClientEvents[K]) => void) {
        this.name = name;
        this.listener = listener;
    }
}

/**
 * Class for adding client events.
 */
export class EventsHandler {

    /** Client for events. */
    private readonly client: Client;

    /**
     * Events handler constructor.
     * @param client - Client for events.
     */
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Add new event.
     * @param event - Event to be added.
     */
    add<K extends keyof ClientEvents>(event: Event<K>): void {
        this.client.on(event.name, (...args) => event.listener(this.client, ...args));
    }

    /**
     * Load events from directory.
     * @param dirPath - An absolute path to directory with events files.
     */
    load(dirPath: string): void {
        fs.readdirSync(dirPath).forEach((file) => {
            void import(path.resolve(dirPath, file)).then((module: EventModule) => {
                this.add(module.default);
            });
        });
    }
}

/**
 * Example of event module.
 */
interface EventModule {
    default: Event<never>
}