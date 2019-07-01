import { Request, Response } from "express";
import {userRepository} from "../../../repository/userRepository";
import * as bcrypt from 'bcrypt';

/**
 * @class registerUserAction
 */
export class registerUserAction {

    /**
     * @property userRepository
     */
    private repo = new userRepository();

    /**
     * @param req
     * @param res
     */
    async invoke(req: Request, res: Response) {
        const data = req.body;
        data.password = await bcrypt.hash(data.password, 10);
        const user = await this.repo.create(data);
        user.password = undefined;
        return res.send(user);
    }
}
