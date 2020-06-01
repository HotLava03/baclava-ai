Object.defineProperty(exports, "__esModule", { value: true });
exports.Basic = void 0;
const framework_1 = require("../framework");
var Basic;
(function (Basic) {
    class Help {
        constructor() {
            this.name = 'help';
            this.description = 'Stop it. Get some help.';
            this.category = framework_1.Category.BASIC;
            this.aliases = ['helpme', 'halp'];
            this.usage = '[command]';
            this.minArgs = 0;
            this.onCommand = (_message, args) => {
                var _a;
                if (args.length === 0)
                    return 'You can get help here: http://baclava.wtf/help';
                const command = framework_1.getCommandByName(args[0]);
                if (!command)
                    return 'Unknown command.';
                else
                    return `**${command.name}** - ${command.description}\nUsage: >>${(command.name + ' ') + ((_a = command.usage) !== null && _a !== void 0 ? _a : '')}`;
            };
        }
    }
    Basic.Help = Help;
})(Basic = exports.Basic || (exports.Basic = {}));
//# sourceMappingURL=basic.js.map