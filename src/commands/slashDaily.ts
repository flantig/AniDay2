import {
    ButtonComponent,
    Discord,
    Slash,
    SlashChoice, SlashGroup,
    SlashOption
} from "discordx";
import {
    ButtonInteraction,
    CommandInteraction, Message,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    MessagePayload
} from "discord.js";
import {DateTime} from "luxon";
import EmbeddedDaily from "../helpers/daily";
import {backBtn, begBtn, endBtn, lessBtn, moreBtn, nextBtn} from "../helpers/classButtons";
import monfun from "../helpers/classMongo";

function buttonState(interaction: ButtonInteraction) {
    (this.expandedState === 0) ?
        nextBtn("manual").interaction(interaction, this.short, new MessageActionRow().addComponents(moreBtn("manual").button, (this.counter != 0) ? backBtn("manual").button : begBtn("manual").button, (this.counter < this.shortFull.short.length - 1) ? nextBtn("manual").button : endBtn("manual").button))
        :
        nextBtn("manual").interaction(interaction, this.full, new MessageActionRow().addComponents(lessBtn("manual").button, (this.counter != 0) ? backBtn("manual").button : begBtn("manual").button, (this.counter < this.shortFull.short.length - 1) ? nextBtn("manual").button : endBtn("manual").button));
}

@Discord()
export class slashDaily {
    public shortFull: any;
    public short: MessageEmbed[];
    public full: MessageEmbed[];
    public expandedState = 0;
    public counter = 0;


    @Slash("daily")
    async daily(interaction: CommandInteraction) {
        await interaction.deferReply();
        let day = DateTime.local();
        const today = new EmbeddedDaily(day, await monfun.getImageSet(day.toLocaleString({
            month: 'short',
            day: '2-digit'
        })));


        this.shortFull = await today.returnEveryDay();
        const short = new MessageActionRow().addComponents(moreBtn("manual").button, (this.counter != 0) ? backBtn("manual").button : begBtn("manual").button, (this.counter < this.shortFull.short.length - 1) ? nextBtn("manual").button : endBtn("manual").button);


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


    // register a handler for the button with ID: "hello-btn"
    @ButtonComponent("more-btn-manual")
    morebtn(interaction: ButtonInteraction) {
        this.expandedState = 1;
        moreBtn("manual").interaction(interaction, this.full, new MessageActionRow().addComponents(lessBtn("manual").button, (this.counter != 0) ? backBtn("manual").button : begBtn("manual").button, (this.counter < this.shortFull.short.length - 1) ? nextBtn("manual").button : endBtn("manual").button));
    }

    @ButtonComponent("less-btn-manual")
    lessbtn(interaction: ButtonInteraction) {
        this.expandedState = 0;
        moreBtn("manual").interaction(interaction, this.short, new MessageActionRow().addComponents(moreBtn("manual").button, (this.counter != 0) ? backBtn("manual").button : begBtn("manual").button, (this.counter < this.shortFull.short.length - 1) ? nextBtn("manual").button : endBtn("manual").button));
    }

    @ButtonComponent("nxt-btn-manual")
    nextbtn(interaction: ButtonInteraction) {
        if (this.counter < this.short.length) {
            this.counter++;
            this.short = [this.shortFull.short[this.counter]];
            this.full = [this.shortFull.full[this.counter]];
            console.log(this.counter);
            buttonState.call(this, interaction);
        }
    }

    @ButtonComponent("bck-btn-manual")
    backbtn(interaction: ButtonInteraction) {
        if (this.counter > 0) {
            this.counter--;
            this.short = [this.shortFull.short[this.counter]];
            this.full = [this.shortFull.full[this.counter]];
            console.log(this.counter);
            buttonState.call(this, interaction);
        }
    }

    @ButtonComponent("beg-btn-manual")
    begbtn(interaction: ButtonInteraction) {
        begBtn("manual").interaction(interaction);
    }

    @ButtonComponent("end-btn-manual")
    endbtn(interaction: ButtonInteraction) {
        endBtn("manual").interaction(interaction);
    }


}