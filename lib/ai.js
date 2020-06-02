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
exports.UserHistory = exports.AI = void 0;
const cleverbot_free_1 = __importDefault(require("cleverbot-free"));
let AI = /** @class */ (() => {
    class AI {
        // This is a singleton, no need for a constructor.
        constructor() {
        }
        static init() {
            AI.ai = new AI();
            AI.cache = new Map();
        }
        static instance() {
            return AI.ai;
        }
        submit(id, content) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield cleverbot_free_1.default(content, (_b = (_a = AI.cache.get(id)) === null || _a === void 0 ? void 0 : _a.getConversations()) !== null && _b !== void 0 ? _b : []);
                let greet = '';
                if (this.addToCache(id, response, content))
                    greet = this.randomGreet();
                // Sorry, your grammar is too good for my taste.
                return greet + response.toLowerCase().replace('.', '').replace('?', '').trim();
            });
        }
        /**
         * Add a new conversation to cache.
         * @param id The user ID.
         * @param conversation The latest conversation.
         * @returns True if the history was reset after 10 minutes past of inactivity.
         */
        addToCache(id, conversation, response) {
            const now = Date.now();
            const history = AI.cache.get(id);
            if (!history) {
                AI.cache.set(id, new UserHistory(conversation, response, now));
                return false;
            }
            history.add(conversation, response);
            return history.resetIfApplicable(now);
        }
        randomGreet() {
            return AI.greets[Math.floor(Math.random() * (AI.greets.length - 1))] + '\n';
        }
    }
    AI.greets = [
        'oh hello', 'oh hi', 'hey', 'sup bitch',
        'hello', 'hi', 'hii', 'heyy'
    ];
    return AI;
})();
exports.AI = AI;
class UserHistory {
    constructor(conversation, response, timestamp) {
        this.conversations = [response, conversation];
        this.timestamp = timestamp;
    }
    resetIfApplicable(timestamp) {
        // 600000ms = 10min
        console.log(timestamp - this.timestamp);
        if (timestamp - this.timestamp < 6000)
            return false;
        console.log('Reset');
        this.timestamp = timestamp;
        this.conversations = [];
        return true;
    }
    add(conversation, response) {
        this.conversations.push(conversation, response);
    }
    getConversations() {
        return this.conversations;
    }
}
exports.UserHistory = UserHistory;
//# sourceMappingURL=ai.js.map