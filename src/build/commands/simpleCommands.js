"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discordx_1 = require("discordx");
let simpleCommandExample = class simpleCommandExample {
    hello(command) {
        command.message.reply(`👋 ${command.message.member}`);
    }
    slashTest(command) {
    }
};
(0, tslib_1.__decorate)([
    (0, discordx_1.SimpleCommand)("hello", { aliases: ["hi"] }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discordx_1.SimpleCommandMessage]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], simpleCommandExample.prototype, "hello", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.SimpleCommand)("slashTest", { aliases: ["hi"] }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discordx_1.SimpleCommandMessage]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], simpleCommandExample.prototype, "slashTest", null);
simpleCommandExample = (0, tslib_1.__decorate)([
    (0, discordx_1.Discord)()
], simpleCommandExample);
//# sourceMappingURL=simpleCommands.js.map