import {ObjectId} from "bson";

interface Game {
    _id: string|ObjectId;
    target_score: number;
    winner_id: string;
    user_ids: any;
    created_at: Date;
    updated_at: Date;
}

export default Game;
