import {Request, Response} from "express";
import {HttpSuccess} from "../../../utils/httpSuccess";
import {gameRepository} from "../../../repository/gameRepository";
import {userRepository} from "../../../repository/userRepository";

/**
 * @class showGameAction
 */
export class showGameAction {

    constructor(
        private repo: gameRepository,
        private userRepo: userRepository
    ) {
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

            let result = await this.getUsersFromDb(gameRecord);

            return HttpSuccess(res, result);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: "Not found",
                details: []
            });
        }
    }


    /**
     * @param game
     * @return game
     */
    async getUsersFromDb(game: any) {

        let users = game.user_ids.map(function (element: any) {
            return element.id;
        });

        if (game.winner_id) {
            users.push(game.winner_id);
        }

        const result = await this.userRepo.findManyByIds(users);

        game.user_ids.forEach(function (value: any) {
            result.forEach(function (v) {
                if (value.id == v._id) {
                    value.user = v;
                }
            })
        });

        if (game.winner_id) {
            result.forEach(function (val) {
                if (val._id == game.winner_id) {
                    game.winner = val;
                }
            })
        }

        return game;
    }
}
