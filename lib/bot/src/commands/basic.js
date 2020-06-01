var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Category, helpMessage, getCommandByName } from '../framework';
export var Basic;
(function (Basic) {
    class Help {
        constructor() {
            this.name = 'help';
            this.description = 'Stop it. Get some help.';
            this.category = Category.BASIC;
            this.aliases = ['helpme', 'halp'];
            this.minArgs = 0;
            this.onCommand = (message, args) => {
                var _a;
                if (args.length === 0) {
                    message.author.getDMChannel().then((c) => __awaiter(this, void 0, void 0, function* () { return yield c.createMessage(helpMessage); }));
                    return;
                }
                const command = getCommandByName(args[0]);
                if (!command)
                    return 'Unknown command.';
                else
                    return `**${command.name}** - ${command.description}\nUsage: >>${(_a = (command.name + ' ' + command.usage)) !== null && _a !== void 0 ? _a : command.name}`;
            };
        }
    }
    Basic.Help = Help;
})(Basic || (Basic = {}));
//# sourceMappingURL=basic.js.map