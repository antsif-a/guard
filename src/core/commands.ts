import { Client, Message } from 'discord.js';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Bot command.
 */
export class Command {

    /** Command name. */
    public readonly name: string;

    /** Command listener. */
    public listener: (message: Message, ...args: string[]) => void;

    /**
     * Command constructor.
     * @param name - Command name.
     * @param listener  Command listener.
     */
    constructor(name: string, listener: (message: Message, ...args: string[]) => void) {
        this.name = name;
        this.listener = listener;
    }

    /**
     * Run command.
     * @param message - A message that called this command.
     * @param client - Current bot.
     * @param args - Command args.
     */
    public run(message: Message, ...args: string[]): void {
        return this.listener(message, ...args);
    }
}

/**
 * Class used for defining bot commands.
 */
export class CommandsHandler {

    /** Client for commands. */
    private readonly client: Client;

    /** Command prefix. */
    private readonly prefix: string;

    /** Array of all commands. */
    private commands: Command[];

    /**
     * Commands handler constructor.
     * @param client - Client for commands.
     * @param prefix - Command prefix.
     */
    constructor(client: Client, prefix: string) {
        this.client = client;
        this.prefix = prefix;
        this.commands = [];

        this.client.on('message', (message: Message): void => {
            if (message.author.bot || !message.content.startsWith(this.prefix)) return;

            const args: string[] = message.content.slice(this.prefix.length).trim().split(/ +/);
            const commandName: string = args.shift().toLowerCase();

            const command = this.find(commandName);
            if (command) command.run(message, ...args);
        });
    }

    /**
     * Add new command.
     * @param command - Command to be added.
     */
    public add(command: Command): CommandsHandler {
        this.commands.push(command);
        return this;
    }

    /**
     * Clear bot commands.
     */
    public clear(): CommandsHandler {
        this.commands = [];
        return this;
    }

    /**
     * Load directory with commands.
     * @param dirPath - An absolute path to directory with commands files.
     */
    public load(dirPath: string): CommandsHandler {
        fs.readdirSync(dirPath).forEach((file) => {
            void import(path.resolve(dirPath, file)).then((module: CommandModule) => {
                this.add(module.default);
            });
        });

        return this;
    }

    /**
     * Find existing command.
     * @param name - Command name.
     */
    public find(name: string): Command {
        if (!name) return null;
        return this.commands.find((command) => command.name == name);
    }

    /**
     * Get all commands.
     */
    public all(): Command[] {
        return this.commands;
    }
}

/**
 * Helper type.
 */
type CommandModule = {
    default: Command
};