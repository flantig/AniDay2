import AniDayHybrid from "../models/aniDayHybrid";
const AWS = require('aws-sdk');
const axios = require('axios');
const config = require('../../config.json');
const {DateTime} = require("luxon");
const {MongoClient} = require('mongodb');
const uri = `mongodb+srv://${config.mongoUSR}:${config.mongoPW}@${config.mongoCOL}.pk6r8.mongodb.net/${config.mongoDB}?retryWrites=true&w=majority`
const mongoClient = new MongoClient(uri);

module.exports = {
    getImageSet: async (day: string) => {
        await mongoClient.connect();
        const dayImgs = await mongoClient.db("aniDayStorage").collection("aniDayHybrid").find({ "day" : day}).toArray() as AniDayHybrid[];
        await mongoClient.close();
        return dayImgs;
    },
    sendMongoEntry: async (guildID: string, guildCurrentChannel: string) => {
        await mongoClient.connect();
        let result;

        result = await mongoClient.db("aniDayStorage").collection("dailyImage").replaceOne({"guildID": guildID}, {
            "guildID": guildID,
            "channelID": guildCurrentChannel
        }, {upsert: true});

        await mongoClient.close();
        return result.guildID;
    },
    removeMongoEntry: async (guildID: string) => {
        await mongoClient.connect();
        let botFeedback;
        const currentListLength = await mongoClient.db("aniDayStorage").collection("dailyImage").findOne({"guildID": guildID});
        if (currentListLength != null) {
            await mongoClient.db("aniDayStorage").collection("dailyImage").deleteOne({"guildID": guildID});
            botFeedback = "We successfully removed AniDay posts!"
        } else {
            botFeedback = "This server was never receiving AniDay posts..."
        }
        await mongoClient.close();
        return botFeedback;
    },
    dailyMongoSender: async () => {
        await mongoClient.connect();
        const daily = await mongoClient.db("aniDayStorage").collection("dailyImage").find({}, {
            "guildID": 1,
            "channelID": 1,
            "_id": 0
        }).toArray();
        await mongoClient.close();
        return daily;

    },
}
