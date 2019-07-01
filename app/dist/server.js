"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const middleware_1 = __importDefault(require("./middleware"));
const errorHandlers_1 = __importDefault(require("./middleware/errorHandlers"));
const route_1 = __importDefault(require("./route"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("./database/mongodb");
dotenv_1.default.config({ path: __dirname + '/../../.env' });
const router = express_1.default();
utils_1.applyMiddleware(middleware_1.default, router);
utils_1.applyRoutes(route_1.default, router);
utils_1.applyMiddleware(errorHandlers_1.default, router);
mongodb_1.connectToMongo();
const PORT = process.env.NODE_PORT;
const server = http_1.default.createServer(router);
server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}...`));
//# sourceMappingURL=server.js.map