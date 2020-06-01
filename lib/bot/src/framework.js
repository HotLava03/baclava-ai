import { Basic } from './commands/basic';
export var Category;
(function (Category) {
    Category[Category["BASIC"] = 0] = "BASIC";
    Category[Category["FUN"] = 1] = "FUN";
    Category[Category["MODERATION"] = 2] = "MODERATION";
    Category[Category["OWNER"] = 3] = "OWNER";
    Category[Category["NONE"] = 4] = "NONE";
})(Category || (Category = {}));
export const getCommandByName = (name) => {
    var _a;
    if (commands.get(name))
        return commands.get(name);
    for (const cmdName in commands) {
        const cmd = commands.get(cmdName);
        if ((_a = cmd === null || cmd === void 0 ? void 0 : cmd.aliases) === null || _a === void 0 ? void 0 : _a.includes(name))
            return cmd;
    }
};
export const runCommand = (name, message) => { var _a; return (_a = getCommandByName(name)) === null || _a === void 0 ? void 0 : _a.onCommand(message, message.content.split(/\s+/).slice(1)); };
const commands = new Map([
    ['help', new Basic.Help()]
]);
export const helpMessage = (() => {
    var _a, _b, _c, _d, _e;
    const embed = {
        embed: {
            title: 'Baclava help',
            fields: []
        }
    };
    let currentCategory = Category.NONE;
    for (const name in commands) {
        const cmd = commands.get(name);
        if (!cmd)
            continue;
        if (currentCategory !== cmd.category) {
            currentCategory = cmd.category;
            (_b = (_a = embed.embed) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.push({ name: format(currentCategory.toString()), value: '' });
        }
        (_e = (_d = (_c = embed.embed) === null || _c === void 0 ? void 0 : _c.fields) === null || _d === void 0 ? void 0 : _d.slice(-1)[0].value) === null || _e === void 0 ? void 0 : _e.concat(cmd.name + ' - ' + cmd.description + '\n');
    }
    return embed;
}).call(this);
const format = (str) => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
//# sourceMappingURL=framework.js.map