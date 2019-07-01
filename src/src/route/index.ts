import {Request, Response} from "express";
import {registerUserAction} from "../http/controllers/user/registerUserAction";

export default [
    {
        path: "/user",
        method: "post",
        handler: async (req: Request, res: Response) => {
            new registerUserAction().invoke(req, res)
        }
    }
];
