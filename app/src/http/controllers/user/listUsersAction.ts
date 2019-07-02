import {Request, Response} from "express";
import {userRepository} from "../../../repository/userRepository";
import {HttpSuccess} from "../../../utils/httpSuccess";
import {paginator} from "../../../utils/paginator";

/**
 * @class listUsersAction
 */
export class listUsersAction {

    constructor(private repo: userRepository) {
    }

    /**
     * @param req
     * @param res
     */
    async invoke(req: Request, res: Response) {

        let perPage = paginator.filterPerPage(req.query.per_page);
        let page = paginator.filterPage(req.query.page);

        let result = await this.repo.findAll(page, perPage).then((users) => {
            return users;
        });

        return HttpSuccess(
            res,
            new paginator(result.data, result.count, page, perPage, process.env.API_BASE_URL + req.path).resolve()
            );
    }
}
