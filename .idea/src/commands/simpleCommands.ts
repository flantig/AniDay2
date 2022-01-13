import {
    Discord,
    SimpleCommand,
    SimpleCommandMessage,
    SimpleCommandOption,
} from "discordx";

@Discord()
class simpleCommandExample {
    @SimpleCommand("hello", { aliases: ["hi"] })
    hello(command: SimpleCommandMessage) {
        command.message.reply(`👋 ${command.message.member}`);
    }

}