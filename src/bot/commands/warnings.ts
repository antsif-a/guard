import { Command } from 'core/commands';

const command = new Command('warnings', (message, username) => {
    const member = message.mentions.members.first();

    if (!username || !member) return void message.channel.send('No user provided!');

    // GuardBot.database.all(Sql.get('warnings'), [member.id, member.guild.id], (err, rows) => {
    //     if (err) console.error(err);
    //     if (!rows.length) {
    //         void channel.send(`User '${member.user.username}' has 0 warnings.`);
    //     } else {
    //         // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    //         const warnings: number = rows[0].warnings;
    //         void channel.send(`User '${member.user.username}' has ${warnings} ${warnings == 1
    //             ? 'warning'
    //             : 'warnings'}.`);
    //     }
    // });
});

command.permissions.push("MANAGE_MESSAGES");

export default command;
