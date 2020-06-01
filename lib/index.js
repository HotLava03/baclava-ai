var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eris_1 = __importDefault(require("eris"));
const framework_1 = require("./framework");
(() => __awaiter(this, void 0, void 0, function* () {
    var _a;
    const client = new eris_1.default.Client((_a = process.env.TOKEN) !== null && _a !== void 0 ? _a : '');
    client.on('messageCreate', message => {
        if (!message.content.match(/^>>\w+/))
            return;
        const returned = framework_1.runCommand(message.content.split(/\s+/)[0].substring(2), message);
        if (!returned)
            return;
        message.channel.createMessage(returned);
    });
    client.connect();
})).call(this);
//# sourceMappingURL=index.js.map