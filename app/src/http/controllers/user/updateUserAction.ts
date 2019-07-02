import {Request, Response} from "express";
import {userRepository} from "../../../repository/userRepository";
import {HttpSuccess} from "../../../utils/httpSuccess";
import * as bcrypt from 'bcrypt';
import {ObjectId} from "bson";

/**
 * @class listUsersAction
 */
export class updateUserAction {

    constructor(private repo: userRepository) {
    }

    /**
     * @param req
     * @param res
     */
    async invoke(req: Request, res: Response) {

        let permission = await this.checkUserExistence(req.body.email, req.app.get('user').id);

        if (!permission) {
            return res.status(422).send({
                "error": "Unprocessable Entity",
                "details": [{
                    email: "Email has already been taken"
                }]
            });
        }

        let data = {
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            name: req.body.name,
        };

        await this.repo.findOneAndUpdate(req.app.get('user').id, data, {new: true}).then((user) => {

        });

        return HttpSuccess(res, {}, 204);
    }


    /**
     * @param email
     * @param userId
     */
    async checkUserExistence(email: string, userId: string) {
        let result: any = true;

        result = await this.repo.findOneByCriteria({email: email, _id: {$ne: new ObjectId(userId)}}).then(
            (user) => {
                if (!user) {
                    return true;
                } else {
                    return false;
                }
            }
        ).catch(() => {
            return false;
        });

        return result;
    }
}
