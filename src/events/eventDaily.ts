import {ArgsOf, ButtonComponent, Client, Discord, On} from "discordx";
import {ButtonInteraction, MessageActionRow, MessageEmbed, TextChannel} from "discord.js";
import EmbeddedDaily from "../helpers/daily";
import monfun from "../helpers/classMongo";
import {DateTime} from "luxon";
import {endBtn, begBtn, backBtn, lessBtn, nextBtn, moreBtn} from "../helpers/classButtons";
import schedule from "node-schedule";

function buttonState(interaction: ButtonInteraction) {
    (this.expandedState === 0) ?
        nextBtn("auto").interaction(interaction, this.short, new MessageActionRow().addComponents(moreBtn("auto").button, (this.counter != 0) ? backBtn("auto").button : begBtn("auto").button, (this.counter < this.shortFull.short.length - 1) ? nextBtn("auto").button : endBtn("auto").button))
        :
        nextBtn("auto").interaction(interaction, this.full, new MessageActionRow().addComponents(lessBtn("auto").button, (this.counter != 0) ? backBtn("auto").button : begBtn("auto").button, (this.counter < this.shortFull.short.length - 1) ? nextBtn("auto").button : endBtn("auto").button));
}

@Discord()
export class eventDaily {
    public counter = 0;
    public shortFull: any;
    public short: MessageEmbed[];
    public full: MessageEmbed[];
    public expandedState = 0;


    @On("ready")
    async fireMessage([client]: ArgsOf<"ready">) {
        const guildID = "395682517878964237"
        const channelID = "438097287210860556"
        let day = DateTime.local();
        const today = new EmbeddedDaily(day, await monfun.getImageSet(day.toLocaleString({
            month: 'short',
            day: '2-digit'
        })));
        let dailyGuildArray = await monfun.dailyMongoSender();
        schedule.scheduleJob('01 00 * * *', async fireDate => {

            for (const element of dailyGuildArray) {
                const guild = await client.guilds.fetch(guildID);
                const channel = await guild.channels.cache.get(channelID) as TextChannel;

                this.shortFull = await today.returnEveryDay();

                const short = new MessageActionRow().addComponents(moreBtn("auto").button, (this.counter != 0) ? backBtn("auto").button : begBtn("auto").button, (this.counter < this.shortFull.short.length - 1) ? nextBtn("auto").button : endBtn("auto").button)
                if (!guild) return;

                if (this.shortFull) {
                    this.short = [this.shortFull.short[this.counter]];
                    this.full = [this.shortFull.full[this.counter]];
                    await channel.send({
                        embeds: this.short,
                        components: [short],
                    });
                }
            }
        })
    }

    // register a handler for the button with ID: "hello-btn"
    @ButtonComponent("more-btn-auto")
    morebtn(interaction: ButtonInteraction) {
        this.expandedState = 1;
        moreBtn("auto").interaction(interaction, this.full, new MessageActionRow().addComponents(lessBtn("auto").button, (this.counter != 0) ? backBtn("auto").button : begBtn("auto").button, (this.counter < this.shortFull.short.length - 1) ? nextBtn("auto").button : endBtn("auto").button));
    }

    @ButtonComponent("less-btn-auto")
    lessbtn(interaction: ButtonInteraction) {
        this.expandedState = 0;
        moreBtn("auto").interaction(interaction, this.short, new MessageActionRow().addComponents(moreBtn("auto").button, (this.counter != 0) ? backBtn("auto").button : begBtn("auto").button, (this.counter < this.shortFull.short.length - 1) ? nextBtn("auto").button : endBtn("auto").button));
    }

    @ButtonComponent("nxt-btn-auto")
    nextbtn(interaction: ButtonInteraction) {
        if (this.counter < this.short.length) {
            this.counter++;
            this.short = [this.shortFull.short[this.counter]];
            this.full = [this.shortFull.full[this.counter]];
            console.log(this.counter);
            buttonState.call(this, interaction);
        }
    }

    @ButtonComponent("bck-btn-auto")
    backbtn(interaction: ButtonInteraction) {
        if (this.counter > 0) {
            this.counter--;
            this.short = [this.shortFull.short[this.counter]];
            this.full = [this.shortFull.full[this.counter]];
            console.log(this.counter);
            buttonState.call(this, interaction);
        }
    }

    @ButtonComponent("beg-btn-auto")
    begbtn(interaction: ButtonInteraction) {
        begBtn("auto").interaction(interaction);
    }

    @ButtonComponent("end-btn-auto")
    endbtn(interaction: ButtonInteraction) {
        endBtn("auto").interaction(interaction);
    }

}