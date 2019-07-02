import {NextFunction, Request, Response, Router} from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import {plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';
import {HTTP401Error, HTTP422Error} from "../utils/httpErrors";
import express from "express";
import * as jwt from "jsonwebtoken";
import {userRepository} from "../repository/userRepository";

/**
 * @param router
 */
export const handleCors = (router: Router) =>
    router.use(cors({credentials: true, origin: true}));

/**
 * @param router
 */
export const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({extended: true}));
    router.use(parser.json());
};

/**
 * @param router
 */
export const handleCompression = (router: Router) => {
    router.use(compression());
};

/**
 * @param router
 */
export const handleResponseHeaders = (router: Router) => {
    router.use((req: Request, res: Response, next: NextFunction) => {
        res.append('Content-Type', 'application/json');
        next();
    });
};

/**
 * @param type
 */
export const validationMiddleware = (type: any): express.RequestHandler => {
    return (req, res, next) => {
        validate(plainToClass(type, req.body))
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = errors.map((error: ValidationError) => {
                        let result: any = {};
                        result[error.property] = [];
                        for (let key in error.constraints) {
                            result[error.property].push(error.constraints[key]);
                        }
                        return result;
                    });
                    next(new HTTP422Error(message));
                } else {
                    next();
                }
            });
    };
};

/**
 * authentication middleware
 */
export const authMiddleware = ((req: Request, res: Response, next: NextFunction) => {

    let token = <string>req.headers["authorization"];
    let jwtPayload;
    const repo = new userRepository();

    if (token) {
        if (!token.startsWith('Bearer ')) {
            return next(new HTTP401Error("Invalid Token"));
        } else {
            token = token.substr(7);
        }
    } else {
        return next(new HTTP401Error("Missing Token"));
    }

    try {
        jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET || '');
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        return next(new HTTP401Error("Invalid Token"));
    }

    if (jwtPayload && jwtPayload.exp < (Date.now() / 1000)) {
        return next(new HTTP401Error("Expired Token"));
    }

    let promise = repo.findOneByEmail(jwtPayload.username);

    promise.then((user) => {
        if (!user) {
            return next(new HTTP401Error("Invalid User"));
        }
    });

    req.app.set('user', {'email': jwtPayload.username, 'id': jwtPayload.id});

    return next();

});
