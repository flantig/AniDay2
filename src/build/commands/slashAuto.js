"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discordx_1 = require("discordx");
const discord_js_1 = require("discord.js");
const classMongo_1 = (0, tslib_1.__importDefault)(require("../helpers/classMongo"));
let slashDaily = class slashDaily {
    async on(interaction) {
        await classMongo_1.default.sendMongoEntry(interaction.guildId, interaction.channelId);
        await interaction.reply("You have turned daily posts on for this channel! Remember, you can always turn me off with '/auto off'.");
    }
    async off(interaction) {
        await classMongo_1.default.removeMongoEntry(interaction.guildId);
        await interaction.reply("You have turned daily posts off!");
    }
};
(0, tslib_1.__decorate)([
    (0, discordx_1.Slash)("on"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.CommandInteraction]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], slashDaily.prototype, "on", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.Slash)("off"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.CommandInteraction]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], slashDaily.prototype, "off", null);
slashDaily = (0, tslib_1.__decorate)([
    (0, discordx_1.Discord)(),
    (0, discordx_1.SlashGroup)("auto", "Set a daily aniday image for any given text channel!")
], slashDaily);
//# sourceMappingURL=slashAuto.js.map