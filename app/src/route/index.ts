import {Request, Response} from "express";
import {registerUserAction} from "../http/controllers/user/registerUserAction";
import {validationMiddleware} from "../middleware/common";
import registerUserValidators from "../validation/user/registerUserValidators";
import {userRepository} from "../repository/userRepository";

export default [
    {
        path: "/user",
        method: "post",
        handler: [
            validationMiddleware(registerUserValidators),
            async (req: Request, res: Response) => {
                new registerUserAction(new userRepository()).invoke(req, res)
            }
        ]
    }
];
