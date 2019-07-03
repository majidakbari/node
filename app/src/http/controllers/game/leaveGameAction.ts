import {Request, Response} from "express";
import {HttpSuccess} from "../../../utils/httpSuccess";
import {gameRepository} from "../../../repository/gameRepository";

/**
 * @class leaveGameAction
 */
export class leaveGameAction {

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

            if (!this.checkAccess(req.app.get('user').id, gameRecord)) {
                return res.status(400).json({
                    error: "Bad Request",
                    details: [
                        {
                            "reason" : "You are not a member of this game or the game is closed or you are the game creator"
                        }
                    ]
                });
            }

            if (gameRecord) {
                let userIds = gameRecord.user_ids;

                for (let index in userIds) {
                    if (userIds[index].id == req.app.get('user').id) {
                       userIds.splice(index, 1)
                    }
                }

                await this.repo.findOneAndUpdate(gameRecord._id, {user_ids: userIds});
                return HttpSuccess(res, {}, 204);
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

        if (gameRecord.status == 'closed' || gameRecord.created_by == userId) {
            authorized = false;
        }

        return authorized;
    }
}
