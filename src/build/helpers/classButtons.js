"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endBtn = exports.begBtn = exports.backBtn = exports.nextBtn = exports.lessBtn = exports.moreBtn = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const luxon_1 = require("luxon");
const classMongo_1 = (0, tslib_1.__importDefault)(require("./classMongo"));
function getInteraction() {
    return (interaction, full, messageActionRow) => {
        let day = luxon_1.DateTime.local().toLocaleString({ month: 'short', day: '2-digit' });
        interaction.update({
            content: " ",
            embeds: full,
            components: [messageActionRow],
        });
        classMongo_1.default.getImageSet(day);
    };
}
const moreBtn = (eventType) => {
    return ({
        button: new discord_js_1.MessageButton()
            .setLabel("More")
            .setEmoji("➕")
            .setStyle("PRIMARY")
            .setCustomId("more-btn-" + eventType),
        interaction: getInteraction()
    });
};
exports.moreBtn = moreBtn;
const lessBtn = (eventType) => {
    return ({
        button: new discord_js_1.MessageButton()
            .setLabel("Less")
            .setEmoji("➖")
            .setStyle("PRIMARY")
            .setCustomId("less-btn-" + eventType),
        interaction: getInteraction()
    });
};
exports.lessBtn = lessBtn;
const nextBtn = (eventType) => {
    return ({
        button: new discord_js_1.MessageButton()
            .setLabel("Next")
            .setEmoji("⏩")
            .setStyle("PRIMARY")
            .setCustomId("nxt-btn-" + eventType),
        interaction: getInteraction()
    });
};
exports.nextBtn = nextBtn;
const backBtn = (eventType) => {
    return ({
        button: new discord_js_1.MessageButton()
            .setLabel("Back")
            .setEmoji("⏪")
            .setStyle("PRIMARY")
            .setCustomId("bck-btn-" + eventType),
        interaction: getInteraction()
    });
};
exports.backBtn = backBtn;
const begBtn = (eventType) => {
    return ({
        button: new discord_js_1.MessageButton()
            .setLabel("Back")
            .setEmoji("⏪")
            .setStyle("SECONDARY")
            .setCustomId("beg-btn-" + eventType),
        interaction: (interaction) => {
            interaction.update({ content: " " });
        }
    });
};
exports.begBtn = begBtn;
const endBtn = (eventType) => {
    return ({
        button: new discord_js_1.MessageButton()
            .setLabel("Next")
            .setEmoji("⏩")
            .setStyle("SECONDARY")
            .setCustomId("end-btn-" + eventType),
        interaction: (interaction) => {
            interaction.update({ content: " " });
        }
    });
};
exports.endBtn = endBtn;
exports.default = { endBtn: exports.endBtn, begBtn: exports.begBtn, backBtn: exports.backBtn, lessBtn: exports.lessBtn, nextBtn: exports.nextBtn, moreBtn: exports.moreBtn };
//# sourceMappingURL=classButtons.js.map