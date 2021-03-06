const { discordToken } = require('../config.json');
import "reflect-metadata";
import { Intents, Interaction, Message } from "discord.js";
import { Client } from "discordx";

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

client.once('ready', async () => {

    await client.initApplicationCommands({
        guild: { log: true },
        global: { log: true },
    });
    await client.initApplicationPermissions();
    console.log(`${__dirname}`)
    console.log('Ready!');
});

client.on("interactionCreate", (interaction) => {
    client.executeInteraction(interaction);
});

client.on("messageCreate", (message: Message) => {
    client.executeCommand(message);
});

client.login(discordToken);