import {ObjectId} from "mongodb";

export default class AniDayHybrid {
    constructor(public day: string, public url: string, public title: string, public description: string, public score: string, public genre: string[], public episodes: number, public hash: string, public method: string, public id?: ObjectId) {}
}