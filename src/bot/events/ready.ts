import { Colors, Formats, dev } from '../../constants';
import { Event } from '../../core';

export default new Event('ready', (client) => {
    const { username, discriminator } = client.user;

    console.log(
        `\n${Formats.underscore + Formats.bright + Colors.blue}Guard Bot started!${Formats.reset}\n\n` +

        `Username: ${Colors.yellow}${username}#${discriminator}${Formats.reset}\n` +
        `Servers: ${Colors.yellow}${client.guilds.cache.size}${Formats.reset}\n` +

        (dev == 'true' ? '' : 

        `\n${Colors.green}--------------------------------------------------------------------------\n` +
        'If you need any help, you can talk to us through discord at - https://discord.gg/TugrCuy.\n' +
        'You can also email us at developers.guard@gmail.com.\n' +
        `--------------------------------------------------------------------------${Formats.reset}\n`));
});
