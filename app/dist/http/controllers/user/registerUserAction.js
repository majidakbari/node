"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = require("../../../repository/userRepository");
const bcrypt = __importStar(require("bcrypt"));
/**
 * @class registerUserAction
 */
class registerUserAction {
    constructor() {
        /**
         * @property userRepository
         */
        this.repo = new userRepository_1.userRepository();
    }
    /**
     * @param req
     * @param res
     */
    invoke(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            data.password = yield bcrypt.hash(data.password, 10);
            const user = yield this.repo.create(data);
            user.password = undefined;
            return res.send(user);
        });
    }
}
exports.registerUserAction = registerUserAction;
//# sourceMappingURL=registerUserAction.js.map