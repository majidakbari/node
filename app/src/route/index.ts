import {Request, Response, Router} from "express";
import {registerUserAction} from "../http/controllers/user/registerUserAction";
import {authMiddleware, validationMiddleware} from "../middleware/common";
import registerUserValidators from "../validation/user/registerUserValidators";
import {userRepository} from "../repository/userRepository";
import getTokenValidator from "../validation/auth/getTokenValidator";
import {getTokenAction} from "../http/controllers/auth/getTokenAction";
import {getProfileAction} from "../http/controllers/user/getProfileAction";
import {listUsersAction} from "../http/controllers/user/listUsersAction";
import {updateUserAction} from "../http/controllers/user/updateUserAction";
import updateUserValidator from "../validation/user/updateUserValidator";

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
        path: "/api/user",
        method: "get",
        handler: [
            (req: Request, res: Response) => {
                new listUsersAction(new userRepository).invoke(req, res);
            }
        ]
    },
    {
        path: "/api/user",
        method: "put",
        handler: [
            authMiddleware,
            validationMiddleware(updateUserValidator),
            (req: Request, res: Response) => {
                new updateUserAction(new userRepository).invoke(req, res);
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
    },
    {
        path: "/api/me",
        method: "get",
        handler: [
            authMiddleware,
            (req: Request, res: Response) => {
                new getProfileAction(new userRepository()).invoke(req, res);
            }
        ]
    }
];
