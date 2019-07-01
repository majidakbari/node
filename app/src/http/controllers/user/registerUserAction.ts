import { Request, Response } from "express";
import {userRepository} from "../../../repository/userRepository";
import * as bcrypt from 'bcrypt';
import {HTTP422Error} from "../../../utils/httpErrors";
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
        const data = req.body;
        await this.checkUniqueEmail(data.email);
        data.password = await bcrypt.hash(data.password, 10);
        const user = await this.repo.create(data);
        user.password = undefined;

        return HttpSuccess(res, user, 201);
    }


    /**
     *
     * @param email
     */
    async checkUniqueEmail(email: String) {
        if(await this.repo.findOneByEmail(email)) {
            throw new HTTP422Error([{
                'email' : 'Email should be unique'
            }])
        }
    }
}
