import {ObjectId} from "mongodb";
import {MessageEmbed} from "discord.js";

export default class AllDayEmbeddeds {
    constructor(public short: MessageEmbed[], public full: MessageEmbed[]) {}
}