import { Client, GuildMember, Message, PermissionString } from 'discord.js';
import { prisma } from 'core/prisma';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Bot command.
 */
export class Command {

    /** Command name. */
    readonly name: string;

    /** Command listener. */
    readonly listener: CommandListener;

    /** Permissions required for command call. */
    permissions: PermissionString[];

    /**
     * Command constructor.
     * @param name - Command name.
     * @param listener - Command listener.
     */
    constructor(name: string, listener: CommandListener) {
        this.name = name;
        this.listener = listener;
        this.permissions = [];
    }

    permission(...permissions: PermissionString[]): Command {
        this.permissions.push(...permissions);

        return this;
    }

    checkPermissions(member: GuildMember): boolean {
        for (const p of this.permissions) {
            if (!member.hasPermission(p)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Run command.
     * @param message - A message that called this command.
     * @param args - Command args.
     */
    async run(message: Message, ...args: string[]): Promise<void> {
        await this.listener(message, ...args);
    }
}

/**
 * Class used for defining bot commands.
 */
export class CommandsHandler {

    /** Client for commands. */
    private readonly client: Client;

    /** Default command prefix. */
    private readonly defaultPrefix: string;

    /** Missing permissions message. */
    private getPermissionAlert: PermissionDeniedAlert;

    /** Array of all commands. */
    private commands: Command[];

    /**
     * Commands handler constructor.
     * @param client - Client for commands.
     * @param defaultPrefix - Command prefix.
     */
    constructor(client: Client, defaultPrefix: string) {
        this.client = client;
        this.defaultPrefix = defaultPrefix;
        this.commands = [];

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this.client.on('message', async (message: Message) => {
            let guild = await prisma.guild.findFirst({
                where: {
                    id: message.guild.id
                },
                select: {
                    prefix: true
                }
            });

            if (!guild) {
                guild = await prisma.guild.create({
                    data: {
                        id: message.guild.id,
                    },
                });
            }

            const { prefix } = guild;

            if (message.author.bot || !message.content.startsWith(prefix)) return;

            const args: string[] = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName: string = args.shift().toLowerCase();

            const command = this.find(commandName);
            if (command) {
                if (!command.checkPermissions(message.member)) {
                    return this.getPermissionAlert
                        ? void await message.channel.send(this.getPermissionAlert(message, command))
                        : undefined;
                }
                await command.run(message, ...args);
            }
        });
    }

    /**
     * Add new command.
     * @param command - Command to be added.
     */
    add(command: Command): CommandsHandler {
        this.commands.push(command);
        return this;
    }

    /**
     * Clear bot commands.
     */
    clear(): CommandsHandler {
        this.commands = [];
        return this;
    }

    /**
     * Load directory with commands.
     * @param dirPath - An absolute path to directory with commands files.
     */
    load(dirPath: string): CommandsHandler {
        fs.readdirSync(dirPath).forEach((file) => {
            void import(path.resolve(dirPath, file)).then((module: CommandModule) => {
                this.add(module.default);
            });
        });

        return this;
    }

    /**
     * Set denied permissions alert listener
     * @param listener - A function that returns message depend on message and command.
     */
    setPermissionsAlert(listener: PermissionDeniedAlert): CommandsHandler {
        this.getPermissionAlert = listener;
        return this;
    }

    /**
     * Find existing command.
     * @param name - Command name.
     */
    find(name: string): Command {
        if (!name) return null;
        return this.commands.find((command) => command.name == name);
    }

    /**
     * Get all commands.
     */
    all(): Command[] {
        return this.commands;
    }
}

type PermissionDeniedAlert = (message: Message, command: Command) => string;

type CommandListener = (message: Message, ...args: string[]) => Promise<void>;

/**
 * Example of command module.
 */
interface CommandModule {
    default: Command
}
