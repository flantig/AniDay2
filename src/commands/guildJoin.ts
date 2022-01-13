import {ArgsOf, Client, Discord, On} from "discordx";
import {initialize} from "../helpers/clientSettings";

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
        await initialize()
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