import {
    ButtonComponent,
    Discord,
    Slash,
    SlashChoice,
    SlashOption
} from "discordx";
import {
    ButtonInteraction,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    MessagePayload
} from "discord.js";
import {DateTime} from "luxon";
import EmbeddedDaily from "../helpers/daily";

const buttons = require("../helpers/buttons");
const monfun = require("../helpers/mongo");

function buttonState(interaction: ButtonInteraction) {
    (this.expandedState === 0) ?
        buttons.nextBtn.interaction(interaction, this.short, new MessageActionRow().addComponents(buttons.moreBtn.button, (this.counter != 0) ? buttons.backBtn.button : buttons.begBtn.button, (this.counter < this.shortFull.short.length - 1) ? buttons.nextBtn.button : buttons.endBtn.button))
        :
        buttons.nextBtn.interaction(interaction, this.full, new MessageActionRow().addComponents(buttons.lessBtn.button, (this.counter != 0) ? buttons.backBtn.button : buttons.begBtn.button, (this.counter < this.shortFull.short.length - 1) ? buttons.nextBtn.button : buttons.endBtn.button));
}

@Discord()
class slashCommands {
    public shortFull: any;
    public short: MessageEmbed[];
    public full: MessageEmbed[];
    public expandedState = 0;
    public counter = 0;

    @Slash("hello")
    async hello(interaction: CommandInteraction) {
        await interaction.reply("Yo, what's up!");
    }

    @Slash("daily")
    async daily(interaction: CommandInteraction) {
        await interaction.deferReply();
        let day = DateTime.local().plus({ days: -2 });
        const today = new EmbeddedDaily(day, await monfun.getImageSet(day.toLocaleString({
            month: 'short',
            day: '2-digit'
        })));


        this.shortFull = await today.returnEveryDay();
        // () =>{if(this.counter != 0)return buttons.backBtn.button}, () =>{if(this.counter != this.shortFull.short.length)return buttons.nextBtn.button}
        const short = new MessageActionRow().addComponents(buttons.moreBtn.button, (this.counter != 0)? buttons.backBtn.button: buttons.begBtn.button, (this.counter < this.shortFull.short.length -1)? buttons.nextBtn.button:buttons.endBtn.button);


        if (this.shortFull) {
            this.short = [this.shortFull.short[this.counter]];
            this.full = [this.shortFull.full[this.counter]];
            interaction.editReply({
                embeds: this.short,
                components: [short],
            });
        } else {
            interaction.editReply({
                content: "We couldn't find an image today, sorry!",
                components: [],
            });
        }
    }

    @Slash("auto")

    // register a handler for the button with ID: "hello-btn"
    @ButtonComponent("more-btn")
    morebtn(interaction: ButtonInteraction) {
        this.expandedState = 1;
        buttons.moreBtn.interaction(interaction, this.full, new MessageActionRow().addComponents(buttons.lessBtn.button, (this.counter != 0)? buttons.backBtn.button: buttons.begBtn.button, (this.counter < this.shortFull.short.length -1)? buttons.nextBtn.button:buttons.endBtn.button));
    }

    @ButtonComponent("less-btn")
    lessbtn(interaction: ButtonInteraction) {
        this.expandedState = 0;
        buttons.moreBtn.interaction(interaction, this.short, new MessageActionRow().addComponents(buttons.moreBtn.button, (this.counter != 0)? buttons.backBtn.button: buttons.begBtn.button, (this.counter < this.shortFull.short.length -1)? buttons.nextBtn.button:buttons.endBtn.button));
    }

    @ButtonComponent("nxt-btn")
    nextbtn(interaction: ButtonInteraction) {
        if(this.counter < this.short.length) {
            this.counter++;
            this.short = [this.shortFull.short[this.counter]];
            this.full = [this.shortFull.full[this.counter]];
            console.log(this.counter);
            buttonState.call(this, interaction);
        }
    }

    @ButtonComponent("bck-btn")
    backbtn(interaction: ButtonInteraction) {
        if(this.counter > 0) {
            this.counter--;
            this.short = [this.shortFull.short[this.counter]];
            this.full = [this.shortFull.full[this.counter]];
            console.log(this.counter);
            buttonState.call(this, interaction);
        }
    }

    @ButtonComponent("beg-btn")
    begbtn(interaction: ButtonInteraction){
        buttons.begBtn.interaction(interaction);
    }

    @ButtonComponent("end-btn")
    endbtn(interaction: ButtonInteraction){
        buttons.endBtn.interaction(interaction);
    }


}