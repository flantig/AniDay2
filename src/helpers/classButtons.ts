import {ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed, MessagePayload} from "discord.js";
import {DateTime} from "luxon";
import monfun from "./classMongo"

function getInteraction() {
    return (interaction: ButtonInteraction, full: MessageEmbed[], messageActionRow: MessageActionRow) => {
        let day = DateTime.local().toLocaleString({month: 'short', day: '2-digit'});
        interaction.update({
            content: " ",
            embeds: full,
            components: [messageActionRow],
        });
        monfun.getImageSet(day);
    };
}


export const moreBtn = (eventType: string) => {
    return ({
        button:
            new MessageButton()
                .setLabel("More")
                .setEmoji("➕")
                .setStyle("PRIMARY")
                .setCustomId("more-btn-" + eventType),
        interaction:
            getInteraction()
    })
}


export const lessBtn = (eventType: string) => {
    return ({
        button:
            new MessageButton()
                .setLabel("Less")
                .setEmoji("➖")
                .setStyle("PRIMARY")
                .setCustomId("less-btn-" + eventType),
        interaction:
            getInteraction()
    })
}

export const nextBtn = (eventType: string) => {
    return ({
        button:
            new MessageButton()
                .setLabel("Next")
                .setEmoji("⏩")
                .setStyle("PRIMARY")
                .setCustomId("nxt-btn-" + eventType),
        interaction:
            getInteraction()
    })
}

export const backBtn = (eventType: string) => {
    return ({
        button:
            new MessageButton()
                .setLabel("Back")
                .setEmoji("⏪")
                .setStyle("PRIMARY")
                .setCustomId("bck-btn-" + eventType),
        interaction:
            getInteraction()
    })
}

export const begBtn = (eventType: string) => {
    return ({
        button:
            new MessageButton()
                .setLabel("Back")
                .setEmoji("⏪")
                .setStyle("SECONDARY")
                .setCustomId("beg-btn-" + eventType),
        interaction: (interaction: ButtonInteraction) => {
            interaction.update({content: " "});
        }
    })
}

export const endBtn = (eventType: string) => {
    return ({
        button:
            new MessageButton()
                .setLabel("Next")
                .setEmoji("⏩")
                .setStyle("SECONDARY")
                .setCustomId("end-btn-" + eventType),
        interaction: (interaction: ButtonInteraction) => {
            interaction.update({content: " "});
        }
    })
}

export default {endBtn, begBtn, backBtn, lessBtn, nextBtn, moreBtn}