import { Command } from 'core/commands';
import { prisma } from 'core/prisma';

const command = new Command('warn', async (message) => {
    const mentioned = message.mentions.members.first();

    if (!mentioned) {
        await message.channel.send('No user provided!');
        return;
    }

    const member = await prisma.member.findUnique({
        where: {
            id_guildId: {
                id: mentioned.id,
                guildId: mentioned.guild.id
            }
        },
        select: {
            warnings: true,
        },
    });

    const warnings = member ? member.warnings + 1 : 1;

    await prisma.member.upsert({
        where: {
            id_guildId: {
                id: mentioned.id,
                guildId: mentioned.guild.id
            }
        },
        create: {
            id: mentioned.id,
            guildId: mentioned.guild.id,
            warnings: 1,
        },
        update: {
            warnings,
        },
    });

    await message.channel.send(`User '${mentioned.user.username}' has been warned ${warnings} times.`);
});

command.permissions.push("MANAGE_MESSAGES");

export default command;
