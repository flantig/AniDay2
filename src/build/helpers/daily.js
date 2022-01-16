"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const allDayEmbeddeds_1 = (0, tslib_1.__importDefault)(require("../models/allDayEmbeddeds"));
class EmbeddedDaily {
    constructor(day, mongoMultipleDays) {
        this.mongoMultipleDays = mongoMultipleDays;
        this.day = day;
    }
    getMessageObject(mongoDay) {
        let msgObj = [];
        let genre, medium;
        const today = this.day.toLocaleString({
            month: 'long',
            day: '2-digit'
        });
        const body = `**Genre:** ${mongoDay.genre} \n **Rating:** ${mongoDay.score} \n **Episodes:** ${mongoDay.episodes}`;
        msgObj.push(new discord_js_1.MessageEmbed().setTitle(`**${today}**`).setImage(mongoDay.url).setDescription(`**${mongoDay.title}**`));
        msgObj.push(new discord_js_1.MessageEmbed().setTitle(`**${today}**`).setImage(mongoDay.url).setDescription(`**${mongoDay.title}**`).addField("**--Synopsis--**", `||${mongoDay.description}||`).addField("**--Info--**", `${body}`));
        console.log(msgObj);
        return msgObj;
    }
    async returnRandomDay() {
        const everyDay = await this.returnEveryDay();
        let randomPick = [];
        randomPick.push(everyDay.short[Math.floor(Math.random() * (everyDay.short.length))]);
        return (this.mongoMultipleDays != undefined) ?
            randomPick
            :
                undefined;
    }
    async returnEveryDay() {
        const allDallies = new allDayEmbeddeds_1.default([], []);
        if (this.mongoMultipleDays) {
            for (let curDay of this.mongoMultipleDays) {
                const shortAndFull = await this.getMessageObject(curDay);
                allDallies.short.push(shortAndFull[0]);
                allDallies.full.push(shortAndFull[1]);
            }
        }
        return allDallies;
    }
}
exports.default = EmbeddedDaily;
//# sourceMappingURL=daily.js.map