import {Discord, Slash, SlashGroup} from "discordx";
import {CommandInteraction} from "discord.js";
import monfun from "../helpers/classMongo"

@Discord()
@SlashGroup("auto","Set a daily aniday image for any given text channel!")
class slashDaily {

    @Slash("on")
    async on(interaction: CommandInteraction){
        await monfun.sendMongoEntry(interaction.guildId, interaction.channelId);
        await interaction.reply("You have turned daily posts on for this channel! Remember, you can always turn me off with '/auto off'.");
    }

    @Slash("off")
    async off(interaction: CommandInteraction){
        await monfun.removeMongoEntry(interaction.guildId);
        await interaction.reply("You have turned daily posts off!");
    }
}