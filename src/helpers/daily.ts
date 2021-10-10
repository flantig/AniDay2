import {DateTime, Settings} from "luxon";
import {ButtonInteraction, MessageEmbed} from "discord.js";
import AniDayHybrid from "../models/aniDayHybrid";
import {log} from "util";
import AllDayEmbeddeds from "../models/allDayEmbeddeds";

export default class EmbeddedDaily {
    mongoMultipleDays: AniDayHybrid[] | undefined;
    day: DateTime;

    constructor(day: DateTime, mongoMultipleDays ?: AniDayHybrid[]) {
        this.mongoMultipleDays = mongoMultipleDays;
        this.day = day;
    }

    getMessageObject(mongoDay: AniDayHybrid): MessageEmbed[] {
        let msgObj: MessageEmbed[] = [];
        let genre, medium;

        const today = this.day.toLocaleString({
            month: 'long',
            day: '2-digit'
        });

        const body = `**Genre:** ${mongoDay.genre} \n **Rating:** ${mongoDay.score} \n **Episodes:** ${mongoDay.episodes}`
        msgObj.push(new MessageEmbed().setTitle(`**${today}**`).setImage(mongoDay.url).setDescription(`**${mongoDay.title}**`))
        msgObj.push(new MessageEmbed().setTitle(`**${today}**`).setImage(mongoDay.url).setDescription(`**${mongoDay.title}**`).addField("**--Synopsis--**", `||${mongoDay.description}||`).addField("**--Info--**", `${body}`))

        console.log(msgObj);
        return msgObj;
    }

    returnRandomDay() {
        (this.mongoMultipleDays != undefined) ?
            console.log(Math.round(Math.random() * (this.mongoMultipleDays.length - 1)))
            :
            console.log("Undefined@@@@@@@@@");


        return (this.mongoMultipleDays != undefined) ?
            this.getMessageObject(this.mongoMultipleDays[Math.round(Math.random() * (this.mongoMultipleDays.length - 1))])
            :
            undefined;
    }

    async returnEveryDay(): Promise<AllDayEmbeddeds> {
        const allDallies = new AllDayEmbeddeds([], []);

        if(this.mongoMultipleDays) {
            for (let curDay of this.mongoMultipleDays) {
                const shortAndFull = await this.getMessageObject(curDay);
                allDallies.short.push(shortAndFull[0]);
                allDallies.full.push(shortAndFull[1]);
            }
        }

        return allDallies;
    }


}
