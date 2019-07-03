import {abstractRepository} from "./abstractRepository";
import gameModel from "../entity/game";

/**
 * @class gameRepository
 */
export class gameRepository extends abstractRepository{
    constructor(){
        super(gameModel);
    }
}
