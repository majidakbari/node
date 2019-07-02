import {Request, Response} from "express";
import {HttpSuccess} from "../../../utils/httpSuccess";
import * as jwt from "jsonwebtoken";
import {userRepository} from "../../../repository/userRepository";
import User from "../../../entity/user.interface";

/**
 * @class getTokenAction
 */
export class getTokenAction {

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
        this.repo.findOneByEmail(req.body.email).then(
            async (user) => {
                if (user && await user.comparePassword(req.body.password)) {
                    const data = this.generateToken(user);

                    return HttpSuccess(res, {
                        type: "Bearer",
                        access_token: data[0],
                        expires_in: data[1]
                    });
                } else {
                    return res.status(401).json({
                        "error": "Unauthenticated",
                        "details": [{
                            "reason": "Invalid credentials"
                        }]
                    });
                }
            }
        );
    };


    /**
     *
     * @param user
     * @return array
     */
    private generateToken(user: User) {

        const expIn = process.env.JWT_TTL;

        return [jwt.sign(
            {
                username: user.email,
                id: user._id,
            },
            process.env.JWT_SECRET || '',
            {
                expiresIn: expIn
            }
        ), expIn];
    }
}

