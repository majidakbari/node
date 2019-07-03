import {Request, Response} from "express";
import {HttpSuccess} from "../../../utils/httpSuccess";
import {gameRepository} from "../../../repository/gameRepository";

/**
 * @class updateGameAction
 */
export class updateGameAction {

    constructor(private repo: gameRepository) {
    }

    /**
     * @param req
     * @param res
     */
    async invoke(req: Request, res: Response) {
        try {
            let gameRecord = await this.repo.findOneById(req.params.id).then((game) => {
                return game;
            });

            const userId = req.app.get('user').id;

            if (!this.checkAccess(userId, gameRecord)) {
                return res.status(400).json({
                    error: "Bad Request",
                    details: [
                        {
                            "reason": "Game is closed or you are not the creator of the project"
                        }
                    ]
                });
            }

            if (gameRecord) {

                gameRecord.target_score = req.body.target_score;
                await this.repo.findOneAndUpdate(gameRecord._id, {target_score: req.body.target_score});

                return HttpSuccess(res, gameRecord);
            }

        } catch (e) {
            return res.status(404).json({
                error: "Not found",
                details: []
            });
        }
    }


    /**
     * @param userId
     * @param gameRecord
     * @return boolean
     */
    private checkAccess(userId: string, gameRecord: any) {
        let authorized = true;

        if (gameRecord.created_by != userId) {
            authorized = false;
        }


        if (gameRecord.status == 'closed') {
            authorized = false;
        }

        return authorized;
    }
}
