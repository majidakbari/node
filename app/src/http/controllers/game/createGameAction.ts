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

        const userId = req.app.get('user').id;

        let data: object = {
            target_score: req.body.target_score,
            created_by: req.app.get('user').id,
            winner_id: "",
            status: 'new',
            user_ids: [
                {
                    id: userId,
                    score: 0
                }
            ]
        };

        let game = await this.repo.create(data);

        return HttpSuccess(res, game, 201);
    }
}
