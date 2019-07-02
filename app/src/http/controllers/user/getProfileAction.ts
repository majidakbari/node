import { Request, Response } from "express";
import {HttpSuccess} from "../../../utils/httpSuccess";
import {userRepository} from "../../../repository/userRepository";

/**
 * @class getProfileAction
 */
export class getProfileAction {

    /**
     * @param repo
     */
    constructor(private repo: userRepository) {
    }

    /**
     * @param req
     * @param res
     */
    async invoke(req: Request, res: Response) {

        let user = await this.repo.findOneByEmail(req.app.get('user'));

        if (user) {
            user.password = undefined;
            return HttpSuccess(res, user);
        } else {
            res.send(401).json([{
                "error": "Unauthenticated",
                "details": "User Not Found"
            }]);
        }
    }
}
