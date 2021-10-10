"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var luxon_1 = require("luxon");
var monfun = require("../helpers/mongo");
function getInteraction() {
    return function (interaction, full, messageActionRow) {
        var day = luxon_1.DateTime.local().toLocaleString({ month: 'short', day: '2-digit' });
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
        interaction: function (interaction) {
            interaction.update({ content: " " });
        }
    },
    endBtn: {
        button: new discord_js_1.MessageButton()
            .setLabel("Next")
            .setEmoji("⏩")
            .setStyle("SECONDARY")
            .setCustomId("end-btn"),
        interaction: function (interaction) {
            interaction.update({ content: " " });
        }
    },
};
//# sourceMappingURL=buttons.js.map