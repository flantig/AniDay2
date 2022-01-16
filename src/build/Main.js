"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cron = require('node-cron');
const { discordToken } = require('../config.json');
require("reflect-metadata");
const discord_js_1 = require("discord.js");
const discordx_1 = require("discordx");
const path = require("path");
const setup_1 = require("./helpers/setup");
const client = new discordx_1.Client({
    prefix: "!",
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    classes: [
        path.join(__dirname, "commands", "**/*.{ts,js}"),
        path.join(__dirname, "events", "**/*.{ts,js}"),
    ],
    botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
    silent: true,
});
client.once('ready', async () => {
    await (0, setup_1.initializer)(client);
    console.log(`${__dirname}`);
    console.log('Ready!');
});
client.on("interactionCreate", (interaction) => {
    client.executeInteraction(interaction);
});
client.on("messageCreate", (message) => {
    client.executeCommand(message);
});
client.login(discordToken);
//# sourceMappingURL=Main.js.map