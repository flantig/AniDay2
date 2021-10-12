import { ObjectId } from "mongodb";
export default class AniDayHybrid {
    day: string;
    url: string;
    title: string;
    description: string;
    score: string;
    genre: string[];
    episodes: number;
    hash: string;
    method: string;
    id?: ObjectId | undefined;
    constructor(day: string, url: string, title: string, description: string, score: string, genre: string[], episodes: number, hash: string, method: string, id?: ObjectId | undefined);
}
