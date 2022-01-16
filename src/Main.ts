import {DateTime} from "luxon";
var cron = require('node-cron');
const { discordToken } = require('../config.json');
import "reflect-metadata";
import {Intents, Interaction, Message, TextChannel} from "discord.js";
import { Client } from "discordx";
import EmbeddedDaily from "./helpers/daily";
import path = require("path");
import {initializer} from "./helpers/setup";
import monfun from "./helpers/classMongo"

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
        path.join(__dirname, "events", "**/*.{ts,js}"),
    ],
    botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
    silent: true,
});



client.once('ready', async () => {
    await initializer(client);

    console.log(`${__dirname}`);

    console.log('Ready!');
});

client.on("interactionCreate", (interaction) => {
    client.executeInteraction(interaction);

});

client.on("messageCreate", (message: Message) => {
    client.executeCommand(message);
});

client.login(discordToken);