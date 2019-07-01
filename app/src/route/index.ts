import {Request, Response} from "express";
import {registerUserAction} from "../http/controllers/user/registerUserAction";
import {validationMiddleware} from "../middleware/common";
import registerUserValidators from "../validation/user/registerUserValidators";

export default [
    {
        path: "/user",
        method: "post",
        handler: [
            validationMiddleware(registerUserValidators),
            async (req: Request, res: Response) => {
                new registerUserAction().invoke(req, res)
            }
        ]
    }
];
