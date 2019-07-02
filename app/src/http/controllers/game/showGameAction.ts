import {Request, Response} from "express";
import {HttpSuccess} from "../../../utils/httpSuccess";
import {gameRepository} from "../../../repository/gameRepository";

/**
 * @class showGameAction
 */
export class showGameAction {

    constructor(private repo: gameRepository) {
    }

    /**
     * @param req
     * @param res
     */
    async invoke(req: Request, res: Response) {

        try {
            let game = await this.repo.findOneById(req.params.id);
            return HttpSuccess(res, game);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: "Not found",
                details: []
            });
        }

    }
}
