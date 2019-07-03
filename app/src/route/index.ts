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
import createGameValidator from "../validation/game/createGameValidator";
import {createGameAction} from "../http/controllers/game/createGameAction";
import {gameRepository} from "../repository/gameRepository";
import {showGameAction} from "../http/controllers/game/showGameAction";
import {listGamesAction} from "../http/controllers/game/listGamesAction";
import {joinGameAction} from "../http/controllers/game/joinGameAction";
import {leaveGameAction} from "../http/controllers/game/leaveGameAction";
import kickOrInviteUserToGameValidator from "../validation/game/kickOrInviteUserToGameValidator";
import {inviteUserToGameAction} from "../http/controllers/game/inviteUserToGameAction";
import {kickUserFromGameAction} from "../http/controllers/game/kickUserFromGameAction";
import {addToScoreAction} from "../http/controllers/game/addToScoreAction";
import addToScoreValidator from "../validation/game/addToScoreValidator";

export default [

    //user routes
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
        path: "/api/me",
        method: "get",
        handler: [
            authMiddleware,
            (req: Request, res: Response) => {
                new getProfileAction(new userRepository()).invoke(req, res);
            }
        ]
    },

    //auth routes
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


    // game routes
    {
        path: "/api/game",
        method: "post",
        handler: [
            authMiddleware,
            validationMiddleware(createGameValidator),
            (req: Request, res: Response) => {
                new createGameAction(new gameRepository()).invoke(req, res);
            }
        ]
    },
    {
        path: "/api/game/:id",
        method: "get",
        handler: [
            (req: Request, res: Response) => {
                new showGameAction(new gameRepository(), new userRepository()).invoke(req, res);
            }
        ]
    },
    {
        path: "/api/game/:id/join",
        method: "post",
        handler: [
            authMiddleware,
            (req: Request, res: Response) => {
                new joinGameAction(new gameRepository()).invoke(req, res);
            }
        ]
    },
    {
        path: "/api/game/:id/left",
        method: "delete",
        handler: [
            authMiddleware,
            (req: Request, res: Response) => {
                new leaveGameAction(new gameRepository()).invoke(req, res);
            }
        ]
    },
    {
        path: "/api/game/:id/invite",
        method: "post",
        handler: [
            authMiddleware,
            validationMiddleware(kickOrInviteUserToGameValidator),
            (req: Request, res: Response) => {
                new inviteUserToGameAction(new gameRepository()).invoke(req, res);
            }
        ]
    },
    {
        path: "/api/game/:id/kick",
        method: "post",
        handler: [
            authMiddleware,
            validationMiddleware(kickOrInviteUserToGameValidator),
            (req: Request, res: Response) => {
                new kickUserFromGameAction(new gameRepository()).invoke(req, res);
            }
        ]
    },
    {
        path: "/api/game/:id/score",
        method: "post",
        handler: [
            authMiddleware,
            validationMiddleware(addToScoreValidator),
            (req: Request, res: Response) => {
                new addToScoreAction(new gameRepository()).invoke(req, res);
            }
        ]
    },
    {
        path: "/api/game",
        method: "get",
        handler: [
            (req: Request, res: Response) => {
                new listGamesAction(new gameRepository(), new userRepository()).invoke(req, res);
            }
        ]
    }
];
