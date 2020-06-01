Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = exports.getCommandByName = exports.Category = void 0;
const basic_1 = require("./commands/basic");
var Category;
(function (Category) {
    Category[Category["BASIC"] = 0] = "BASIC";
    Category[Category["FUN"] = 1] = "FUN";
    Category[Category["MODERATION"] = 2] = "MODERATION";
    Category[Category["OWNER"] = 3] = "OWNER";
    Category[Category["NONE"] = 4] = "NONE";
})(Category = exports.Category || (exports.Category = {}));
exports.getCommandByName = (name) => {
    var _a;
    if (commands.get(name))
        return commands.get(name);
    for (const cmdName in commands) {
        const cmd = commands.get(cmdName);
        if ((_a = cmd === null || cmd === void 0 ? void 0 : cmd.aliases) === null || _a === void 0 ? void 0 : _a.includes(name))
            return cmd;
    }
};
exports.runCommand = (name, message) => { var _a; return (_a = exports.getCommandByName(name)) === null || _a === void 0 ? void 0 : _a.onCommand(message, message.content.split(/\s+/).slice(1)); };
const commands = new Map([
    ['help', new basic_1.Basic.Help()]
]);
//# sourceMappingURL=framework.js.map