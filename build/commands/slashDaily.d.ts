import { ButtonInteraction, CommandInteraction, MessageEmbed } from "discord.js";
export declare class slashDaily {
    shortFull: any;
    short: MessageEmbed[];
    full: MessageEmbed[];
    expandedState: number;
    counter: number;
    daily(interaction: CommandInteraction): Promise<void>;
    morebtn(interaction: ButtonInteraction): void;
    lessbtn(interaction: ButtonInteraction): void;
    nextbtn(interaction: ButtonInteraction): void;
    backbtn(interaction: ButtonInteraction): void;
    begbtn(interaction: ButtonInteraction): void;
    endbtn(interaction: ButtonInteraction): void;
}
