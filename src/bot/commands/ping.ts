import { Command } from 'core/commands';

export default new Command('ping', async (message) => {
    await message.channel.send('Pong!');
});
