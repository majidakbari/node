import { Request, Response } from "express";
import {userRepository} from "../../../repository/userRepository";
import {HttpSuccess} from "../../../utils/httpSuccess";

/**
 * @class listUsersAction
 */
export class listUsersAction {

    constructor(private repo: userRepository) {}

    /**
     * @param req
     * @param res
     */
    async invoke(req: Request, res: Response) {

        let user = {'s' : ''};
        return HttpSuccess(res, user, 201);
    }
}
