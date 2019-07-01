import {Request, Response} from "express";
import {registerUser} from "../http/controllers/user/registerUser";
import {userRepository} from "../repository/userRepository";

export default [
    {
        path: "/user",
        method: "post",
        handler: async (req: Request, res: Response) => {
            new registerUser(userRepository).invoke(req, res)
        }
    }
];
