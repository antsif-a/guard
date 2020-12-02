import { Command } from 'core/commands';

export default new Command('ping', (message) => {
    void message.channel.send('Pong!');
});
