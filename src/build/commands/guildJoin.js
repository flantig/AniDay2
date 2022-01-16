"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotGuildUpdater = void 0;
const tslib_1 = require("tslib");
const discordx_1 = require("discordx");
const setup_1 = require("../helpers/setup");
const classMongo_1 = (0, tslib_1.__importDefault)(require("../helpers/classMongo"));
let BotGuildUpdater = class BotGuildUpdater {
    /**
     * Automatically refreshes the commands for immediate use upon joining a new guild/server.
     *
     * @param guild
     * @param client
     * @private
     */
    async botJoins([guild], client) {
        await (0, setup_1.initializer)(client);
    }
    /**
     * Deletes any set auto timer for the discord bot.
     *
     * @param guild
     * @param client
     * @private
     */
    async botLeaves([guild], client) {
        await classMongo_1.default.removeMongoEntry(guild.id);
    }
};
(0, tslib_1.__decorate)([
    (0, discordx_1.On)("guildCreate"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, discordx_1.Client]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BotGuildUpdater.prototype, "botJoins", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.On)("guildDelete"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, discordx_1.Client]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BotGuildUpdater.prototype, "botLeaves", null);
BotGuildUpdater = (0, tslib_1.__decorate)([
    (0, discordx_1.Discord)()
], BotGuildUpdater);
exports.BotGuildUpdater = BotGuildUpdater;
//# sourceMappingURL=guildJoin.js.map