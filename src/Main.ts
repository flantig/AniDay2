import {DateTime} from "luxon";
const cron = require('node-cron');
const { discordToken } = require('../config.json');
import "reflect-metadata";
import {Message, TextChannel} from "discord.js";
import EmbeddedDaily from "./helpers/daily";
import {client, initialize} from "./helpers/clientSettings";
const monfun = require("./helpers/mongo.ts");

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

    await initialize()

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