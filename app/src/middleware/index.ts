import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleResponseHeaders
} from "./common";

export default [handleCors, handleBodyRequestParsing, handleCompression, handleResponseHeaders];
