import {Request, Response} from "express";
import {HttpSuccess} from "../../../utils/httpSuccess";
import {gameRepository} from "../../../repository/gameRepository";

/**
 * @class addToScoreAction
 */
export class addToScoreAction {

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
                            "reason": "You are not a member of this game or the game is closed"
                        }
                    ]
                });
            }


            if (gameRecord) {
                let winner_id = gameRecord.winner_id;
                let status = gameRecord.status;
                let userIds = gameRecord.user_ids;

                for (let index in userIds) {
                    if (userIds[index].id == userId) {
                        userIds[index].score = userIds[index].score + req.body.score

                        if (gameRecord.target_score ==  userIds[index].score) {
                            winner_id = userId;
                            status = 'closed';
                        }
                    }
                }

                await this.repo.findOneAndUpdate(gameRecord._id, {user_ids: userIds, winner_id: winner_id, status: status});
                gameRecord.user_ids = userIds;
                gameRecord.winner_id = winner_id;
                gameRecord.status = status;

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
        let authorized = false;

        gameRecord.user_ids.forEach(function (element: any) {
            if (element.id == userId) {
                authorized = true;
            }
        });

        if (gameRecord.status == 'closed') {
            authorized = false;
        }

        return authorized;
    }
}
