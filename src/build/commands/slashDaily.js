"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashDaily = void 0;
const tslib_1 = require("tslib");
const discordx_1 = require("discordx");
const discord_js_1 = require("discord.js");
const luxon_1 = require("luxon");
const daily_1 = (0, tslib_1.__importDefault)(require("../helpers/daily"));
const classButtons_1 = require("../helpers/classButtons");
const classMongo_1 = (0, tslib_1.__importDefault)(require("../helpers/classMongo"));
function buttonState(interaction) {
    (this.expandedState === 0) ?
        (0, classButtons_1.nextBtn)("manual").interaction(interaction, this.short, new discord_js_1.MessageActionRow().addComponents((0, classButtons_1.moreBtn)("manual").button, (this.counter != 0) ? (0, classButtons_1.backBtn)("manual").button : (0, classButtons_1.begBtn)("manual").button, (this.counter < this.shortFull.short.length - 1) ? (0, classButtons_1.nextBtn)("manual").button : (0, classButtons_1.endBtn)("manual").button))
        :
            (0, classButtons_1.nextBtn)("manual").interaction(interaction, this.full, new discord_js_1.MessageActionRow().addComponents((0, classButtons_1.lessBtn)("manual").button, (this.counter != 0) ? (0, classButtons_1.backBtn)("manual").button : (0, classButtons_1.begBtn)("manual").button, (this.counter < this.shortFull.short.length - 1) ? (0, classButtons_1.nextBtn)("manual").button : (0, classButtons_1.endBtn)("manual").button));
}
let slashDaily = class slashDaily {
    constructor() {
        this.expandedState = 0;
        this.counter = 0;
    }
    async daily(interaction) {
        await interaction.deferReply();
        let day = luxon_1.DateTime.local();
        const today = new daily_1.default(day, await classMongo_1.default.getImageSet(day.toLocaleString({
            month: 'short',
            day: '2-digit'
        })));
        this.shortFull = await today.returnEveryDay();
        const short = new discord_js_1.MessageActionRow().addComponents((0, classButtons_1.moreBtn)("manual").button, (this.counter != 0) ? (0, classButtons_1.backBtn)("manual").button : (0, classButtons_1.begBtn)("manual").button, (this.counter < this.shortFull.short.length - 1) ? (0, classButtons_1.nextBtn)("manual").button : (0, classButtons_1.endBtn)("manual").button);
        if (this.shortFull) {
            this.short = [this.shortFull.short[this.counter]];
            this.full = [this.shortFull.full[this.counter]];
            interaction.editReply({
                embeds: this.short,
                components: [short],
            });
        }
        else {
            interaction.editReply({
                content: "We couldn't find an image today, sorry!",
                components: [],
            });
        }
    }
    // register a handler for the button with ID: "hello-btn"
    morebtn(interaction) {
        this.expandedState = 1;
        (0, classButtons_1.moreBtn)("manual").interaction(interaction, this.full, new discord_js_1.MessageActionRow().addComponents((0, classButtons_1.lessBtn)("manual").button, (this.counter != 0) ? (0, classButtons_1.backBtn)("manual").button : (0, classButtons_1.begBtn)("manual").button, (this.counter < this.shortFull.short.length - 1) ? (0, classButtons_1.nextBtn)("manual").button : (0, classButtons_1.endBtn)("manual").button));
    }
    lessbtn(interaction) {
        this.expandedState = 0;
        (0, classButtons_1.moreBtn)("manual").interaction(interaction, this.short, new discord_js_1.MessageActionRow().addComponents((0, classButtons_1.moreBtn)("manual").button, (this.counter != 0) ? (0, classButtons_1.backBtn)("manual").button : (0, classButtons_1.begBtn)("manual").button, (this.counter < this.shortFull.short.length - 1) ? (0, classButtons_1.nextBtn)("manual").button : (0, classButtons_1.endBtn)("manual").button));
    }
    nextbtn(interaction) {
        if (this.counter < this.short.length) {
            this.counter++;
            this.short = [this.shortFull.short[this.counter]];
            this.full = [this.shortFull.full[this.counter]];
            console.log(this.counter);
            buttonState.call(this, interaction);
        }
    }
    backbtn(interaction) {
        if (this.counter > 0) {
            this.counter--;
            this.short = [this.shortFull.short[this.counter]];
            this.full = [this.shortFull.full[this.counter]];
            console.log(this.counter);
            buttonState.call(this, interaction);
        }
    }
    begbtn(interaction) {
        (0, classButtons_1.begBtn)("manual").interaction(interaction);
    }
    endbtn(interaction) {
        (0, classButtons_1.endBtn)("manual").interaction(interaction);
    }
};
(0, tslib_1.__decorate)([
    (0, discordx_1.Slash)("daily"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.CommandInteraction]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], slashDaily.prototype, "daily", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.ButtonComponent)("more-btn-manual"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.ButtonInteraction]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], slashDaily.prototype, "morebtn", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.ButtonComponent)("less-btn-manual"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.ButtonInteraction]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], slashDaily.prototype, "lessbtn", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.ButtonComponent)("nxt-btn-manual"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.ButtonInteraction]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], slashDaily.prototype, "nextbtn", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.ButtonComponent)("bck-btn-manual"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.ButtonInteraction]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], slashDaily.prototype, "backbtn", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.ButtonComponent)("beg-btn-manual"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.ButtonInteraction]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], slashDaily.prototype, "begbtn", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.ButtonComponent)("end-btn-manual"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.ButtonInteraction]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], slashDaily.prototype, "endbtn", null);
slashDaily = (0, tslib_1.__decorate)([
    (0, discordx_1.Discord)()
], slashDaily);
exports.slashDaily = slashDaily;
//# sourceMappingURL=slashDaily.js.map