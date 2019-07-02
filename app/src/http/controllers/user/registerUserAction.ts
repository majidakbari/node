import { Request, Response } from "express";
import {userRepository} from "../../../repository/userRepository";
import * as bcrypt from 'bcrypt';
import {HttpSuccess} from "../../../utils/httpSuccess";

/**
 * @class registerUserAction
 */
export class registerUserAction {

    constructor(private repo: userRepository) {}

    /**
     * @param req
     * @param res
     */
    async invoke(req: Request, res: Response) {

        let data: object = {
            email : req.body.email,
            name : req.body.name,
            password : await bcrypt.hash(req.body.password, 10),
        };
        let user = await this.repo.create(data);
        user.password = undefined;

        return HttpSuccess(res, user, 201);
    }
}
