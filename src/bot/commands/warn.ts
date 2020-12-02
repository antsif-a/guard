import { Command } from 'core/commands';
import { GuardBot } from 'bot/bot';
import { Queries } from 'database/queries';

const command = new Command('warn', (message, username) => {
    const { channel } = message;
    const member = message.mentions.members.first();

    if (!username || !member) return void channel.send('No user provided!');

    const db = GuardBot.database;

    const id = member.id;
    const guildId = member.guild.id;

    db.all(Queries.getWarnings, [id, guildId], (err, rows) => {
        if (err) return console.error(err);
        if (!rows.length) {
            db.run(`
                INSERT INTO Users (id, guild, warnings)
                VALUES (?, ?, ${1});
            `, [id, guildId]);
            void channel.send(`User '${member.user.username}' has been warned 1 time.`);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const warnings: number = rows[0].warnings;
            db.run(`
                UPDATE Users
                SET warnings = ${warnings + 1}
                WHERE id = ? AND guild = ?;
            `, [id, guildId]);
            void channel.send(`User '${member.user.username}' has been warned ${warnings + 1} times.`);
        }
    });
});

command.permissions.push("MANAGE_MESSAGES");

export default command;
