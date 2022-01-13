import {DateTime} from "luxon";
var cron = require('node-cron');
const { discordToken } = require('../config.json');
import "reflect-metadata";
import {Intents, Interaction, Message, TextChannel} from "discord.js";
import { Client } from "discordx";
import EmbeddedDaily from "./helpers/daily";
import path = require("path");
import {initializer} from "./helpers/setup";
const monfun = require("./helpers/mongo.ts");

const client = new Client({
    prefix: "!",
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    classes: [
        path.join(__dirname, "commands", "**/*.{ts,js}"),
    ],
    botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
    silent: true,
});


async function guildDailyRunner() {
    let day = DateTime.local();
    const newDay = new EmbeddedDaily(day, await monfun.getImageSet(day.toLocaleString({
        month: 'short',
        day: '2-digit'
    })));
    let dailyGuildArray = await monfun.dailyMongoSender();

    for (const element of dailyGuildArray) {
        const guild = await client.guilds.fetch(element.guildID);
        const channel = await guild.channels.cache.get(element.channelID) as TextChannel;

        if (channel != undefined)
            {
                await channel.send({embeds: await newDay.returnRandomDay()});
            }
    }
}

client.once('ready', async () => {
    await initializer(client);

    console.log(`${__dirname}`);

    cron.schedule('00 01 * * *', async function () {
        await guildDailyRunner();
    });

    console.log('Ready!');
});

client.on("interactionCreate", (interaction) => {
    client.executeInteraction(interaction);

});

client.on("messageCreate", (message: Message) => {
    client.executeCommand(message);
});

client.login(discordToken);