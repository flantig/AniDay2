"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
const axios = require('axios');
const config = require('../../config.json');
const { DateTime } = require("luxon");
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${config.mongoUSR}:${config.mongoPW}@${config.mongoCOL}.pk6r8.mongodb.net/${config.mongoDB}?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri);
class buttons {
}
exports.default = buttons;
_a = buttons;
buttons.getImageSet = async (day) => {
    await mongoClient.connect();
    const dayImgs = await mongoClient.db("aniDayStorage").collection("aniDayHybrid").find({ "day": day }).toArray();
    await mongoClient.close();
    return dayImgs;
};
buttons.sendMongoEntry = async (guildID, guildCurrentChannel) => {
    await mongoClient.connect();
    let result;
    result = await mongoClient.db("aniDayStorage").collection("dailyImage").replaceOne({ "guildID": guildID }, {
        "guildID": guildID,
        "channelID": guildCurrentChannel
    }, { upsert: true });
    await mongoClient.close();
    return result.guildID;
};
buttons.removeMongoEntry = async (guildID) => {
    await mongoClient.connect();
    let botFeedback;
    const currentListLength = await mongoClient.db("aniDayStorage").collection("dailyImage").findOne({ "guildID": guildID });
    if (currentListLength != null) {
        await mongoClient.db("aniDayStorage").collection("dailyImage").deleteOne({ "guildID": guildID });
        botFeedback = "We successfully removed AniDay posts!";
    }
    else {
        botFeedback = "This server was never receiving AniDay posts...";
    }
    await mongoClient.close();
    return botFeedback;
};
buttons.dailyMongoSender = async () => {
    await mongoClient.connect();
    const daily = await mongoClient.db("aniDayStorage").collection("dailyImage").find({}, {
        "guildID": 1,
        "channelID": 1,
        "_id": 0
    }).toArray();
    await mongoClient.close();
    return daily;
};
//# sourceMappingURL=classMongo.js.map