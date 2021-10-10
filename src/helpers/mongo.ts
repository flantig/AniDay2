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
}
