import { Command } from '../../core';
import { GuardBot } from '../bot';

export default new Command('prefix', (message, prefix) => {
    const { channel } = message;

    if (!prefix) {
        return void GuardBot.instance.getPrefix(message).then(p => {
            void channel.send(`Invalid arguments! Usage: \`${p}prefix <prefix>\``);
        });
    }

    const { id } = message.guild;
    const db = GuardBot.database;

    db.all(`SELECT * FROM Guilds WHERE id = ${message.guild.id};`, [], (err, rows) => {
        if (err) return console.error(err);
        if (!rows.length) {
            db.run(`
                INSERT INTO Guilds (id, prefix)
                VALUES(?, ?);
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