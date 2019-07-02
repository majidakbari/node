import {Request, Response} from "express";
import {registerUserAction} from "../http/controllers/user/registerUserAction";
import {validationMiddleware} from "../middleware/common";
import registerUserValidators from "../validation/user/registerUserValidators";
import {userRepository} from "../repository/userRepository";
import getTokenValidator from "../validation/auth/getTokenValidator";
import {getTokenAction} from "../http/controllers/auth/getTokenAction";

export default [
    {
        path: "/api/user",
        method: "post",
        handler: [
            validationMiddleware(registerUserValidators),
            (req: Request, res: Response) => {
                new registerUserAction(new userRepository).invoke(req, res);
            }
        ]
    },
    {
        path: "/oauth/token",
        method: "post",
        handler: [
            validationMiddleware(getTokenValidator),
            (req: Request, res: Response) => {
                new getTokenAction(new userRepository).invoke(req, res);
            }
        ]
    }
];
