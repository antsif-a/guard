import { Colors, Formats } from '../constants';
import { Event } from 'core/events';
import { GuardBot } from 'bot/bot';

export default new Event('ready', (client) => {
    const { username, discriminator } = client.user;
    const names = GuardBot.instance.commands.all().map((c => c.name));

    console.log(
        `\n${Formats.underscore + Formats.bright + Colors.blue}Guard Bot started!${Formats.reset}\n\n` +

        `Username: ${Colors.yellow}${username}#${discriminator}${Formats.reset}\n` +
        `Servers: ${Colors.yellow}${client.guilds.cache.size}${Formats.reset}\n\n` +

        `${Formats.underscore + Formats.bright}Available commands:${Formats.reset}\n  ` +
        `${names.join('\n  ')}` +

        `\n\n${Colors.green}Our Discord: https://discord.gg/TugrCuy\n` +
        `Our email: developers.guard@gmail.com${Formats.reset}\n`)

        // (dev == 'true' ? '' :
        //
        // `\n\n${Colors.green}Our Discord: https://discord.gg/TugrCuy\n` +
        // `Our email: developers.guard@gmail.com${Formats.reset}\n`));
});

// Old message
// '--------------------------------------------------------------------------'
// 'If you need any help, you can talk to us through discord at - https://discord.gg/TugrCuy.'
// 'You can also email us at developers.guard@gmail.com.'
// '--------------------------------------------------------------------------'
