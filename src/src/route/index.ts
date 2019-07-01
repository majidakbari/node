import {Request, Response} from "express";
import {registerUserAction} from "../http/controllers/user/registerUserAction";
import {userRepository} from "../repository/userRepository";

export default [
    {
        path: "/user",
        method: "post",
        handler: async (req: Request, res: Response) => {
            new registerUserAction(userRepository).invoke(req, res)
        }
    }
];
