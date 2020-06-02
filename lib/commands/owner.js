var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Owner = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const framework_1 = require("../framework");
const util_1 = require("util");
var Owner;
(function (Owner) {
    class Eval {
        constructor() {
            this.name = 'eval';
            this.description = 'Yeah that ain\'t for you';
            this.category = framework_1.Category.OWNER;
            this.aliases = ['fuck'];
            this.usage = '<code>';
            this.minArgs = 1;
            this.onCommand = (message, args) => {
                const author = message.author;
                const member = message.member;
                const reply = (msg) => __awaiter(this, void 0, void 0, function* () { return yield message.channel.createMessage(msg); });
                const argsRaw = args.join(' ');
                try {
                    let toEval = argsRaw;
                    // Remove extra characters.
                    if (toEval.startsWith('`'))
                        toEval = toEval.substring(1);
                    if (toEval.startsWith('``js'))
                        toEval = toEval.substring(4);
                    else if (toEval.startsWith('``'))
                        toEval = toEval.substring(2);
                    if (toEval.endsWith('`'))
                        toEval = toEval.substring(0, toEval.length - 1);
                    if (toEval.endsWith('``'))
                        toEval = toEval.substring(0, toEval.length - 2);
                    // eslint-disable-next-line no-eval
                    Promise.resolve(eval(toEval)).then(str => {
                        const res = util_1.inspect(str);
                        message.addReaction('✅');
                        if (res !== 'undefined')
                            message.channel.createMessage(`${'```'}${res}${'```'}`);
                    });
                }
                catch (e) {
                    message.channel.client.getDMChannel(author.id).then(channel => {
                        message.addReaction('❌');
                        channel.createMessage(`**Error:**\n${e}`);
                    });
                }
                return undefined;
            };
        }
    }
    Owner.Eval = Eval;
})(Owner = exports.Owner || (exports.Owner = {}));
//# sourceMappingURL=owner.js.map