import { Request, Response } from "express";
import {userRepository} from "../../../repository/userRepository";


/**
 * @class registerUser
 */
export class registerUser {

    /**
     * @property userRepository
     */
    private userRepository: userRepository;

    /**
     * @param userRepository
     */
    constructor(userRepository: userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * @param req
     * @param res
     */
    invoke(req: Request, res: Response): Response {
        return res.send({'hi' : 'akbar'});
    }
}
