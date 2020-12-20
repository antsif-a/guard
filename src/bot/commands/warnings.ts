import { Command } from 'core/commands';
import { prisma } from 'core/prisma';

export default new Command('warnings', async (message) => {
    const mentioned = message.mentions.members.first();

    if (!mentioned) {
        await message.channel.send('No user provided!');
        return;
    }

    const member = await prisma.member.findUnique({
        where: {
            id_guildId: {
                id: mentioned.id,
                guildId: mentioned.guild.id,
            },
        },
    });

    const warnings = member ? member.warnings : 0;

    await message.channel.send(`User ${mentioned.user.username} has ${warnings} warnings.`);
}).permission('MANAGE_MESSAGES');
