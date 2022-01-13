"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var luxon_1 = require("luxon");
var cron = require('node-cron');
var discordToken = require('../config.json').discordToken;
require("reflect-metadata");
var discord_js_1 = require("discord.js");
var discordx_1 = require("discordx");
var daily_1 = require("./helpers/daily");
var path = require("path");
var setup_1 = require("./helpers/setup");
var monfun = require("./helpers/mongo.ts");
var client = new discordx_1.Client({
    prefix: "!",
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    classes: [
        path.join(__dirname, "commands", "**/*.{ts,js}"),
    ],
    botGuilds: [function (client) { return client.guilds.cache.map(function (guild) { return guild.id; }); }],
    silent: true,
});
function guildDailyRunner() {
    return __awaiter(this, void 0, void 0, function () {
        var day, newDay, _a, _b, dailyGuildArray, _i, dailyGuildArray_1, element, guild, channel, _c, _d;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    day = luxon_1.DateTime.local();
                    _a = daily_1.default.bind;
                    _b = [void 0, day];
                    return [4 /*yield*/, monfun.getImageSet(day.toLocaleString({
                            month: 'short',
                            day: '2-digit'
                        }))];
                case 1:
                    newDay = new (_a.apply(daily_1.default, _b.concat([_f.sent()])))();
                    return [4 /*yield*/, monfun.dailyMongoSender()];
                case 2:
                    dailyGuildArray = _f.sent();
                    _i = 0, dailyGuildArray_1 = dailyGuildArray;
                    _f.label = 3;
                case 3:
                    if (!(_i < dailyGuildArray_1.length)) return [3 /*break*/, 9];
                    element = dailyGuildArray_1[_i];
                    return [4 /*yield*/, client.guilds.fetch(element.guildID)];
                case 4:
                    guild = _f.sent();
                    return [4 /*yield*/, guild.channels.cache.get(element.channelID)];
                case 5:
                    channel = _f.sent();
                    if (!(channel != undefined)) return [3 /*break*/, 8];
                    _d = (_c = channel).send;
                    _e = {};
                    return [4 /*yield*/, newDay.returnRandomDay()];
                case 6: return [4 /*yield*/, _d.apply(_c, [(_e.embeds = _f.sent(), _e)])];
                case 7:
                    _f.sent();
                    _f.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 3];
                case 9: return [2 /*return*/];
            }
        });
    });
}
client.once('ready', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, setup_1.initializer)(client)];
            case 1:
                _a.sent();
                console.log("" + __dirname);
                cron.schedule('00 01 * * *', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, guildDailyRunner()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                console.log('Ready!');
                return [2 /*return*/];
        }
    });
}); });
client.on("interactionCreate", function (interaction) {
    client.executeInteraction(interaction);
});
client.on("messageCreate", function (message) {
    client.executeCommand(message);
});
client.login(discordToken);
//# sourceMappingURL=Main.js.map