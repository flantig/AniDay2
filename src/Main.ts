import {DateTime} from "luxon";
var cron = require('node-cron');
const { discordToken } = require('../config.json');
import "reflect-metadata";
import {Intents, Interaction, Message, TextChannel} from "discord.js";
import { Client } from "discordx";
import EmbeddedDaily from "./helpers/daily";
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
        `${__dirname}\\commands\\*.{js,ts}`,
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
    const today = new EmbeddedDaily(day, await monfun.getImageSet(newDay));

    for (const element of dailyGuildArray) {
        const channel = client.channels.cache.get(element.channelID) as TextChannel;

        if (channel != undefined)
            await channel.send({embeds: today.returnRandomDay()});
    }
}

client.once('ready', async () => {

    await client.initApplicationCommands({
        guild: { log: true },
        global: { log: true },
    });
    await client.initApplicationPermissions();
    console.log(`${__dirname}`)

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