"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventDaily = void 0;
const tslib_1 = require("tslib");
const discordx_1 = require("discordx");
const discord_js_1 = require("discord.js");
const daily_1 = (0, tslib_1.__importDefault)(require("../helpers/daily"));
const classMongo_1 = (0, tslib_1.__importDefault)(require("../helpers/classMongo"));
const luxon_1 = require("luxon");
const classButtons_1 = require("../helpers/classButtons");
const node_schedule_1 = (0, tslib_1.__importDefault)(require("node-schedule"));
function buttonState(interaction) {
    (this.expandedState === 0) ?
        (0, classButtons_1.nextBtn)("auto").interaction(interaction, this.short, new discord_js_1.MessageActionRow().addComponents((0, classButtons_1.moreBtn)("auto").button, (this.counter != 0) ? (0, classButtons_1.backBtn)("auto").button : (0, classButtons_1.begBtn)("auto").button, (this.counter < this.shortFull.short.length - 1) ? (0, classButtons_1.nextBtn)("auto").button : (0, classButtons_1.endBtn)("auto").button))
        :
            (0, classButtons_1.nextBtn)("auto").interaction(interaction, this.full, new discord_js_1.MessageActionRow().addComponents((0, classButtons_1.lessBtn)("auto").button, (this.counter != 0) ? (0, classButtons_1.backBtn)("auto").button : (0, classButtons_1.begBtn)("auto").button, (this.counter < this.shortFull.short.length - 1) ? (0, classButtons_1.nextBtn)("auto").button : (0, classButtons_1.endBtn)("auto").button));
}
let eventDaily = class eventDaily {
    constructor() {
        this.counter = 0;
        this.expandedState = 0;
    }
    async fireMessage([client]) {
        let day = luxon_1.DateTime.local();
        const today = new daily_1.default(day, await classMongo_1.default.getImageSet(day.toLocaleString({
            month: 'short',
            day: '2-digit'
        })));
        let dailyGuildArray = await classMongo_1.default.dailyMongoSender();
        node_schedule_1.default.scheduleJob('00 01 * * *', async (fireDate) => {
            for (const element of dailyGuildArray) {
                const guild = await client.guilds.fetch(element.guildID);
                const channel = await guild.channels.cache.get(element.channelID);
                this.shortFull = await today.returnEveryDay();
                const short = new discord_js_1.MessageActionRow().addComponents((0, classButtons_1.moreBtn)("auto").button, (this.counter != 0) ? (0, classButtons_1.backBtn)("auto").button : (0, classButtons_1.begBtn)("auto").button, (this.counter < this.shortFull.short.length - 1) ? (0, classButtons_1.nextBtn)("auto").button : (0, classButtons_1.endBtn)("auto").button);
                if (!guild)
                    return;
                if (this.shortFull) {
                    this.short = [this.shortFull.short[this.counter]];
                    this.full = [this.shortFull.full[this.counter]];
                    await channel.send({
                        embeds: this.short,
                        components: [short],
                    });
                }
            }
        });
    }
    // register a handler for the button with ID: "hello-btn"
    morebtn(interaction) {
        this.expandedState = 1;
        (0, classButtons_1.moreBtn)("auto").interaction(interaction, this.full, new discord_js_1.MessageActionRow().addComponents((0, classButtons_1.lessBtn)("auto").button, (this.counter != 0) ? (0, classButtons_1.backBtn)("auto").button : (0, classButtons_1.begBtn)("auto").button, (this.counter < this.shortFull.short.length - 1) ? (0, classButtons_1.nextBtn)("auto").button : (0, classButtons_1.endBtn)("auto").button));
    }
    lessbtn(interaction) {
        this.expandedState = 0;
        (0, classButtons_1.moreBtn)("auto").interaction(interaction, this.short, new discord_js_1.MessageActionRow().addComponents((0, classButtons_1.moreBtn)("auto").button, (this.counter != 0) ? (0, classButtons_1.backBtn)("auto").button : (0, classButtons_1.begBtn)("auto").button, (this.counter < this.shortFull.short.length - 1) ? (0, classButtons_1.nextBtn)("auto").button : (0, classButtons_1.endBtn)("auto").button));
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
        (0, classButtons_1.begBtn)("auto").interaction(interaction);
    }
    endbtn(interaction) {
        (0, classButtons_1.endBtn)("auto").interaction(interaction);
    }
};
(0, tslib_1.__decorate)([
    (0, discordx_1.On)("ready"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], eventDaily.prototype, "fireMessage", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.ButtonComponent)("more-btn-auto"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.ButtonInteraction]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], eventDaily.prototype, "morebtn", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.ButtonComponent)("less-btn-auto"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.ButtonInteraction]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], eventDaily.prototype, "lessbtn", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.ButtonComponent)("nxt-btn-auto"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.ButtonInteraction]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], eventDaily.prototype, "nextbtn", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.ButtonComponent)("bck-btn-auto"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.ButtonInteraction]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], eventDaily.prototype, "backbtn", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.ButtonComponent)("beg-btn-auto"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.ButtonInteraction]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], eventDaily.prototype, "begbtn", null);
(0, tslib_1.__decorate)([
    (0, discordx_1.ButtonComponent)("end-btn-auto"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_js_1.ButtonInteraction]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], eventDaily.prototype, "endbtn", null);
eventDaily = (0, tslib_1.__decorate)([
    (0, discordx_1.Discord)()
], eventDaily);
exports.eventDaily = eventDaily;
//# sourceMappingURL=eventDaily.js.map