import {NextFunction, Request, Response, Router} from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import {HTTP422Error} from "../utils/httpErrors";


export const handleCors = (router: Router) =>
    router.use(cors({credentials: true, origin: true}));

export const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({extended: true}));
    router.use(parser.json());
};

export const handleCompression = (router: Router) => {
    router.use(compression());
};

export const handleResponseHeaders = (router: Router) => {
    router.use((req: Request, res: Response, next: NextFunction) => {
        res.append('Content-Type', 'application/json');
        next();
    });
};

export const validationMiddleware = (type: any) : express.RequestHandler => {
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
