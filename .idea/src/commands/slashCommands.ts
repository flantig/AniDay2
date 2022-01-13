import {
    Discord,
    Slash,
    SlashChoice,
    SlashOption
} from "discordx";
import {CommandInteraction} from "discord.js";


@Discord()
class slashCommands {

    @Slash("hello")
    async hello(interaction: CommandInteraction) {
        await interaction.reply("Yo, what's up!");
    }
}