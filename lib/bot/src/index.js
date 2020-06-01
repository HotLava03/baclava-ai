import Eris from 'eris';
import { runCommand } from './framework';
(() => {
    var _a;
    const client = new Eris.Client((_a = process.env.TOKEN) !== null && _a !== void 0 ? _a : '');
    client.on('messageCreate', message => {
        if (!message.content.match(/^>>\w+/))
            return;
        const returned = runCommand(message.content.split(/\s+/)[0].substring(1), message);
        if (!returned)
            return;
        message.channel.createMessage(returned);
    });
}).call(this);
//# sourceMappingURL=index.js.map