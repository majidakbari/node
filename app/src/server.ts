import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./route";
import dotenv from "dotenv";
import {connectToMongo} from "./database/mongodb";

dotenv.config({path: __dirname + '/../../.env'});

const router = express();

applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);
connectToMongo();

const PORT: string | undefined = process.env.NODE_PORT;
const server = http.createServer(router);

server.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`)
);
