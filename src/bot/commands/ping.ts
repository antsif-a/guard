import { Command } from '../../core';

export default new Command('ping', (message) => {
    void message.channel.send('Pong!');
});