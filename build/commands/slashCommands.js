"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var discordx_1 = require("discordx");
var discord_js_1 = require("discord.js");
var luxon_1 = require("luxon");
var daily_1 = require("../helpers/daily");
var buttons = require("../helpers/buttons");
var monfun = require("../helpers/mongo");
function buttonState(interaction) {
    (this.expandedState === 0) ?
        buttons.nextBtn.interaction(interaction, this.short, new discord_js_1.MessageActionRow().addComponents(buttons.moreBtn.button, (this.counter != 0) ? buttons.backBtn.button : buttons.begBtn.button, (this.counter < this.shortFull.short.length - 1) ? buttons.nextBtn.button : buttons.endBtn.button))
        :
            buttons.nextBtn.interaction(interaction, this.full, new discord_js_1.MessageActionRow().addComponents(buttons.lessBtn.button, (this.counter != 0) ? buttons.backBtn.button : buttons.begBtn.button, (this.counter < this.shortFull.short.length - 1) ? buttons.nextBtn.button : buttons.endBtn.button));
}
var slashCommands = /** @class */ (function () {
    function slashCommands() {
        this.expandedState = 0;
        this.counter = 0;
    }
    slashCommands.prototype.hello = function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, interaction.reply("Yo, what's up!")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    slashCommands.prototype.daily = function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var day, today, _a, _b, _c, short;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, interaction.deferReply()];
                    case 1:
                        _d.sent();
                        day = luxon_1.DateTime.local().plus({ days: -2 });
                        _a = daily_1.default.bind;
                        _b = [void 0, day];
                        return [4 /*yield*/, monfun.getImageSet(day.toLocaleString({
                                month: 'short',
                                day: '2-digit'
                            }))];
                    case 2:
                        today = new (_a.apply(daily_1.default, _b.concat([_d.sent()])))();
                        _c = this;
                        return [4 /*yield*/, today.returnEveryDay()];
                    case 3:
                        _c.shortFull = _d.sent();
                        short = new discord_js_1.MessageActionRow().addComponents(buttons.moreBtn.button, (this.counter != 0) ? buttons.backBtn.button : buttons.begBtn.button, (this.counter < this.shortFull.short.length - 1) ? buttons.nextBtn.button : buttons.endBtn.button);
                        if (this.shortFull) {
                            this.short = [this.shortFull.short[this.counter]];
                            this.full = [this.shortFull.full[this.counter]];
                            interaction.editReply({
                                embeds: this.short,
                                components: [short],
                            });
                        }
                        else {
                            interaction.editReply({
                                content: "We couldn't find an image today, sorry!",
                                components: [],
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    slashCommands.prototype.morebtn = function (interaction) {
        this.expandedState = 1;
        buttons.moreBtn.interaction(interaction, this.full, new discord_js_1.MessageActionRow().addComponents(buttons.lessBtn.button, (this.counter != 0) ? buttons.backBtn.button : buttons.begBtn.button, (this.counter < this.shortFull.short.length - 1) ? buttons.nextBtn.button : buttons.endBtn.button));
    };
    slashCommands.prototype.lessbtn = function (interaction) {
        this.expandedState = 0;
        buttons.moreBtn.interaction(interaction, this.short, new discord_js_1.MessageActionRow().addComponents(buttons.moreBtn.button, (this.counter != 0) ? buttons.backBtn.button : buttons.begBtn.button, (this.counter < this.shortFull.short.length - 1) ? buttons.nextBtn.button : buttons.endBtn.button));
    };
    slashCommands.prototype.nextbtn = function (interaction) {
        if (this.counter < this.short.length) {
            this.counter++;
            this.short = [this.shortFull.short[this.counter]];
            this.full = [this.shortFull.full[this.counter]];
            console.log(this.counter);
            buttonState.call(this, interaction);
        }
    };
    slashCommands.prototype.backbtn = function (interaction) {
        if (this.counter > 0) {
            this.counter--;
            this.short = [this.shortFull.short[this.counter]];
            this.full = [this.shortFull.full[this.counter]];
            console.log(this.counter);
            buttonState.call(this, interaction);
        }
    };
    slashCommands.prototype.begbtn = function (interaction) {
        buttons.begBtn.interaction(interaction);
    };
    slashCommands.prototype.endbtn = function (interaction) {
        buttons.endBtn.interaction(interaction);
    };
    __decorate([
        (0, discordx_1.Slash)("hello")
    ], slashCommands.prototype, "hello", null);
    __decorate([
        (0, discordx_1.Slash)("daily")
    ], slashCommands.prototype, "daily", null);
    __decorate([
        (0, discordx_1.Slash)("auto")
        // register a handler for the button with ID: "hello-btn"
        ,
        (0, discordx_1.ButtonComponent)("more-btn")
    ], slashCommands.prototype, "morebtn", null);
    __decorate([
        (0, discordx_1.ButtonComponent)("less-btn")
    ], slashCommands.prototype, "lessbtn", null);
    __decorate([
        (0, discordx_1.ButtonComponent)("nxt-btn")
    ], slashCommands.prototype, "nextbtn", null);
    __decorate([
        (0, discordx_1.ButtonComponent)("bck-btn")
    ], slashCommands.prototype, "backbtn", null);
    __decorate([
        (0, discordx_1.ButtonComponent)("beg-btn")
    ], slashCommands.prototype, "begbtn", null);
    __decorate([
        (0, discordx_1.ButtonComponent)("end-btn")
    ], slashCommands.prototype, "endbtn", null);
    slashCommands = __decorate([
        (0, discordx_1.Discord)()
    ], slashCommands);
    return slashCommands;
}());
//# sourceMappingURL=slashCommands.js.map