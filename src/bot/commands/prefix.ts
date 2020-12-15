import { Command } from 'core/commands';
import { prisma } from 'core/prisma';

const command = new Command('prefix', async (message, newPrefix) => {
    const { prefix } = await prisma.guild.findFirst({
        where: {
            id: message.guild.id
        },
        select: {
            prefix: true
        }
    });

    if (!newPrefix) {
        await message.channel.send(`Invalid arguments! Usage: \`${prefix}prefix <prefix>\``);
        return;
    }

    await prisma.guild.update({
        where: {
            id: message.guild.id
        },
        data: {
            prefix: newPrefix
        }
    });

    await message.channel.send(`Prefix set to "${newPrefix}"!`);
});

command.permissions.push('MANAGE_MESSAGES');

export default command;
