import { Request, Response } from "express";
import {HttpSuccess} from "../../../utils/httpSuccess";
import {gameRepository} from "../../../repository/gameRepository";

/**
 * @class registerUserAction
 */
export class createGameAction {

    constructor(private repo: gameRepository) {}

    /**
     * @param req
     * @param res
     */
    async invoke(req: Request, res: Response) {

        let data: object = {
            target_score: req.body.target_score,
            created_by: req.app.get('user').id,
            winner_id: "",
            status: 'new',
            user_ids: []
        };

        let game = await this.repo.create(data);

        return HttpSuccess(res, game, 201);
    }
}
