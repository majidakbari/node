"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registerUserAction_1 = require("../http/controllers/user/registerUserAction");
const common_1 = require("../middleware/common");
const registerUserValidators_1 = __importDefault(require("../validation/user/registerUserValidators"));
exports.default = [
    {
        path: "/user",
        method: "post",
        handler: [
            common_1.validationMiddleware(registerUserValidators_1.default),
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                new registerUserAction_1.registerUserAction().invoke(req, res);
            })
        ]
    }
];
//# sourceMappingURL=index.js.map