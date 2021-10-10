import {ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed, MessagePayload} from "discord.js";
import {DateTime} from "luxon";
const monfun = require("../helpers/mongo");

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

module.exports = {

    moreBtn: {
        button:
            new MessageButton()
                .setLabel("More")
                .setEmoji("➕")
                .setStyle("PRIMARY")
                .setCustomId("more-btn"),
        interaction:
            getInteraction()
    },

    lessBtn: {
        button:
            new MessageButton()
                .setLabel("Less")
                .setEmoji("➖")
                .setStyle("PRIMARY")
                .setCustomId("less-btn"),
        interaction:
            getInteraction()
    },

    nextBtn:{
        button:
            new MessageButton()
                .setLabel("Next")
                .setEmoji("⏩")
                .setStyle("PRIMARY")
                .setCustomId("nxt-btn"),
        interaction:
            getInteraction()
        },

    backBtn:{
        button:
            new MessageButton()
                .setLabel("Back")
                .setEmoji("⏪")
                .setStyle("PRIMARY")
                .setCustomId("bck-btn"),
        interaction:
            getInteraction()
    },

    begBtn:{
        button:
            new MessageButton()
                .setLabel("Back")
                .setEmoji("⏪")
                .setStyle("SECONDARY")
                .setCustomId("beg-btn"),
        interaction: (interaction: ButtonInteraction) =>{
            interaction.update({content:" "});
        }
    },

    endBtn:{
        button:
            new MessageButton()
                .setLabel("Next")
                .setEmoji("⏩")
                .setStyle("SECONDARY")
                .setCustomId("end-btn"),
        interaction: (interaction: ButtonInteraction) =>{
            interaction.update({content:" "});
        }
    },
}