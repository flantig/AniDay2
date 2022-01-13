import {ArgsOf, Client, Discord, On} from "discordx";
import exp = require("constants");

const  initializer = async (client: Client) =>{
        await client.initApplicationCommands({
            guild: { log: true },
            global: { log: true },
        });
        await client.initApplicationPermissions();
    }

export {initializer}