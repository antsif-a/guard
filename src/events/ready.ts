import { Event, Colors, Formats } from 'discord-ts-kit';
import { dev } from '../constants';

export default new Event('ready', (client) => {
    const { username, discriminator } = client.user;

    console.log(
        `\n${Formats.underscore + Formats.bright + Colors.blue}Guard Bot started!${Formats.reset}\n\n` +

        `Username: ${Colors.yellow}${username}#${discriminator}${Formats.reset}\n` +
        `Servers: ${Colors.yellow}${client.guilds.cache.size}${Formats.reset}\n` +

        (dev == 'true' ? '' : 

        `\n${Colors.green}--------------------------------------------------------------------------\n` +
        'If you need any help, you can talk to me through discord at - Summet#4530.\n' +
        'You can also email me at summet.dev@gmail.com.\n' +
        `--------------------------------------------------------------------------${Formats.reset}\n`));
});
