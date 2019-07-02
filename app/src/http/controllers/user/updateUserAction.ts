import { Request, Response } from "express";
import {userRepository} from "../../../repository/userRepository";
import {HttpSuccess} from "../../../utils/httpSuccess";

/**
 * @class listUsersAction
 */
export class updateUserAction {

    constructor(private repo: userRepository) {}

    /**
     * @param req
     * @param res
     */
    async invoke(req: Request, res: Response) {

        let user = await this.repo.findOneAndUpdate(req.app.get('user').id, req.body);

        return HttpSuccess(res, user);
    }
}
