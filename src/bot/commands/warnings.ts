import { Command } from '../../core';
import { GuardBot } from '../bot';
import { Queries } from '../../database/queries';

const command = new Command('warnings', (message, username) => {
    const { channel } = message;
    const member = message.mentions.members.first();

    if (!username || !member) return void channel.send('No user provided!');

    GuardBot.database.all(Queries.getWarnings, [member.id, member.guild.id], (err, rows) => {
        if (err) console.error(err);
        if (!rows.length) {
            void channel.send(`User '${member.user.username}' has 0 warnings.`);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const warnings: number = rows[0].warnings;
            void channel.send(`User '${member.user.username}' has ${warnings} ${warnings == 1 
                ? 'warning' 
                : 'warnings'}.`);
        }
    });
});

export default command;
