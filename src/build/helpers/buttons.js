"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const luxon_1 = require("luxon");
const monfun = require("../helpers/mongo");
function getInteraction() {
    return (interaction, full, messageActionRow) => {
        let day = luxon_1.DateTime.local().toLocaleString({ month: 'short', day: '2-digit' });
        interaction.update({
            content: " ",
            embeds: full,
            components: [messageActionRow],
        });
        monfun.getImageSet(day);
    };
}
exports = {
    moreBtn: {
        button: new discord_js_1.MessageButton()
            .setLabel("More")
            .setEmoji("➕")
            .setStyle("PRIMARY")
            .setCustomId("more-btn"),
        interaction: getInteraction()
    },
    lessBtn: {
        button: new discord_js_1.MessageButton()
            .setLabel("Less")
            .setEmoji("➖")
            .setStyle("PRIMARY")
            .setCustomId("less-btn"),
        interaction: getInteraction()
    },
    nextBtn: {
        button: new discord_js_1.MessageButton()
            .setLabel("Next")
            .setEmoji("⏩")
            .setStyle("PRIMARY")
            .setCustomId("nxt-btn"),
        interaction: getInteraction()
    },
    backBtn: {
        button: new discord_js_1.MessageButton()
            .setLabel("Back")
            .setEmoji("⏪")
            .setStyle("PRIMARY")
            .setCustomId("bck-btn"),
        interaction: getInteraction()
    },
    begBtn: {
        button: new discord_js_1.MessageButton()
            .setLabel("Back")
            .setEmoji("⏪")
            .setStyle("SECONDARY")
            .setCustomId("beg-btn"),
        interaction: (interaction) => {
            interaction.update({ content: " " });
        }
    },
    endBtn: {
        button: new discord_js_1.MessageButton()
            .setLabel("Next")
            .setEmoji("⏩")
            .setStyle("SECONDARY")
            .setCustomId("end-btn"),
        interaction: (interaction) => {
            interaction.update({ content: " " });
        }
    },
};
class buttons {
}
exports.default = buttons;
//# sourceMappingURL=buttons.js.map