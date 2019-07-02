import * as mongoose from 'mongoose';
import Game from './game.interface';

const gameSchema = new mongoose.Schema({
    target_score: Number,
    winner_id: String,
    user_ids: Array,
    created_by: String,
    status: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    winner: Object
});


const gameModel = mongoose.model<Game & mongoose.Document>('Game', gameSchema);

export default gameModel;

