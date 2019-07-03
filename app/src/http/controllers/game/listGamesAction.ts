import {Request, Response} from "express";
import {HttpSuccess} from "../../../utils/httpSuccess";
import {paginator} from "../../../utils/paginator";
import {gameRepository} from "../../../repository/gameRepository";
import {userRepository} from "../../../repository/userRepository";

/**
 * @class listGamesAction
 */
export class listGamesAction {

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

        let perPage = paginator.filterPerPage(req.query.per_page);
        let page = paginator.filterPage(req.query.page);

        let result = await this.repo.findAll(
            {"_id": 1, "winner_id": 1, "target_score": 1, "status": 1, "created_at": 1, "updated_at": 1},
            page, perPage).then((games) => {
            return games;
        });

        return HttpSuccess(
            res,
            new paginator(await this.getUsersFromDb(result.data), result.count, page, perPage, process.env.API_BASE_URL + req.path).resolve()
        );
    }

    /**
     * @param games
     * @return games
     */
    async getUsersFromDb(games: any) {

        let users = games.map(function (element: any) {
            if (element.winner_id && element.winner_id != undefined) {
                return element.winner_id;
            }
        });

        if (users.length > 0) {
            const result = await this.userRepo.findManyByIds(users);

            games.forEach(function (value: any) {
                result.forEach(function (v: any) {
                    if (value.winner_id == v._id) {
                        value.winner = v;
                    }
                })
            });
        }

        return games;
    }
}
