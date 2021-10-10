"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var discordx_1 = require("discordx");
var simpleCommandExample = /** @class */ (function () {
    function simpleCommandExample() {
    }
    simpleCommandExample.prototype.hello = function (command) {
        command.message.reply("\uD83D\uDC4B " + command.message.member);
    };
    __decorate([
        (0, discordx_1.SimpleCommand)("hello", { aliases: ["hi"] })
    ], simpleCommandExample.prototype, "hello", null);
    simpleCommandExample = __decorate([
        (0, discordx_1.Discord)()
    ], simpleCommandExample);
    return simpleCommandExample;
}());
//# sourceMappingURL=simpleCommands.js.map