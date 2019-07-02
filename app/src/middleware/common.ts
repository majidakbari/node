import {NextFunction, Request, Response, Router} from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import {plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';
import {HTTP422Error} from "../utils/httpErrors";
import express from "express";

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

