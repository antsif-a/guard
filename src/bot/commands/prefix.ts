import { Command } from 'core/commands';
import { GuardBot } from 'bot/bot';
import { Sql } from '../../database/queries';

const command = new Command('prefix', (message, prefix) => {
    const { channel } = message;

    if (!prefix) {
        return void GuardBot.instance.getPrefix(message).then(p => {
            void channel.send(`Invalid arguments! Usage: \`${p}prefix <prefix>\``);
        });
    }

    const { id } = message.guild;
    const db = GuardBot.database;

    db.all(Sql.get('prefix'), [message.guild.id], (err, rows) => {
        if (err) return console.error(err);
        if (!rows.length) {
            db.run(`
                INSERT INTO Guilds (id, prefix)
                VALUES (?, ?);
            `, [id, prefix]);
        } else {
            db.run(`
                UPDATE Guilds
                SET prefix = ?
                WHERE id = ?;
            `, [prefix, id]);
        }

        void channel.send(`Prefix set to "${prefix}"!`);
    });
});

command.permissions.push('MANAGE_MESSAGES');

export default command;
