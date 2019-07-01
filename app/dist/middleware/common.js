"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const httpErrors_1 = require("../utils/httpErrors");
exports.handleCors = (router) => router.use(cors_1.default({ credentials: true, origin: true }));
exports.handleBodyRequestParsing = (router) => {
    router.use(body_parser_1.default.urlencoded({ extended: true }));
    router.use(body_parser_1.default.json());
};
exports.handleCompression = (router) => {
    router.use(compression_1.default());
};
exports.handleResponseHeaders = (router) => {
    router.use((req, res, next) => {
        res.append('Content-Type', 'application/json');
        next();
    });
};
exports.validationMiddleware = (type) => {
    return (req, res, next) => {
        class_validator_1.validate(class_transformer_1.plainToClass(type, req.body))
            .then((errors) => {
            if (errors.length > 0) {
                const message = errors.map((error) => {
                    let result = {};
                    result[error.property] = [];
                    for (let key in error.constraints) {
                        result[error.property].push(error.constraints[key]);
                    }
                    return result;
                });
                next(new httpErrors_1.HTTP422Error(message));
            }
            else {
                next();
            }
        });
    };
};
//# sourceMappingURL=common.js.map