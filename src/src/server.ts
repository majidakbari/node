import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./route";
import dotenv from "dotenv";

dotenv.config({path: __dirname + '/../../.env'});

process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});

process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const PORT: string | undefined = process.env.NODE_PORT;
console.log(PORT,{path: __dirname + '/../../.env'});
const server = http.createServer(router);

server.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`)
);
