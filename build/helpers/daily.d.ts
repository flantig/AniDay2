import { DateTime } from "luxon";
import { MessageEmbed } from "discord.js";
import AniDayHybrid from "../models/aniDayHybrid";
import AllDayEmbeddeds from "../models/allDayEmbeddeds";
export default class EmbeddedDaily {
    mongoMultipleDays: AniDayHybrid[] | undefined;
    day: DateTime;
    constructor(day: DateTime, mongoMultipleDays?: AniDayHybrid[]);
    getMessageObject(mongoDay: AniDayHybrid): MessageEmbed[];
    returnRandomDay(): Promise<MessageEmbed[] | undefined>;
    returnEveryDay(): Promise<AllDayEmbeddeds>;
}
