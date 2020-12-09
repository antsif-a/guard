import { Client, Message } from 'discord.js';
import { token, defaultPrefix, commandsPath, eventsPath, presence } from 'bot/constants';
import { CommandsHandler } from 'core/commands';
import { EventsHandler } from 'core/events';
import { Database } from 'database/database';
import { Sql } from 'database/queries';

export class GuardBot {
    static instance: GuardBot;

    client: Client;
    database: Database;
    commands: CommandsHandler;
    events: EventsHandler;

    constructor() {
        // Do not allow to create second instance
        if (GuardBot.instance) return GuardBot.instance;

        GuardBot.instance = this;
        Sql.init();
        this.init();
        this.load();
        this.start();
    }

    private init(): void {
        this.client = new Client({ presence });
        this.database = new Database();
        this.commands = new CommandsHandler(this.client, defaultPrefix);
        this.events = new EventsHandler(this.client);
    }

    private load(): void {
        Sql.load();

        this.database.createDefaults();
        this.commands.load(commandsPath);
        this.commands.setPrefix(async (message) => this.getPrefix(message));
        this.commands.setPermissionsAlert((message, command) => {
            return `You can't use ${message.content[0]}${command.name} command!`;
        })
        this.events.load(eventsPath);
    }

    private start(): void {
        void this.client.login(token);
    }

    getPrefix(message: Message): Promise<string> {
        return new Promise((resolve, reject) => {
            this.database.all(`
                SELECT prefix
                FROM Guilds
                WHERE id = ?;
            `, [message.guild.id], (err, rows) => {
                if (err) reject(err);

                let prefix;
                if (rows[0]) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    prefix = rows[0].prefix;
                } else {
                    prefix = defaultPrefix;
                }
                resolve(prefix);
            });
        });
    }

    static get database(): Database {
        return this.instance.database;
    }

    static get commands(): CommandsHandler {
        return this.instance.commands;
    }

    static get events(): EventsHandler {
        return this.instance.events;
    }
}
