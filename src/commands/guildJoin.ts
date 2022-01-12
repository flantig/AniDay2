import {ArgsOf, Client, Discord, On} from "discordx";
const monfun = require("../helpers/mongo");

@Discord()
export class BotGuildUpdater{

    /**
     * Automatically refreshes the commands for immediate use upon joining a new guild/server.
     *
     * @param guild
     * @param client
     * @private
     */
    @On("guildCreate")
    private async botJoins([guild]: ArgsOf<"guildCreate">, client: Client): Promise<void> {
        await client.initApplicationCommands({
            guild: { log: true },
            global: { log: true },
        });
        await client.initApplicationPermissions();
        console.log(`${__dirname}`)
    }

    /**
     * Deletes any set auto timer for the discord bot.
     *
     * @param guild
     * @param client
     * @private
     */
    @On("guildDelete")
    private async botLeaves([guild]: ArgsOf<"guildDelete">, client: Client): Promise<void> {
        await monfun.removeMongoEntry(guild.id);
    }
}