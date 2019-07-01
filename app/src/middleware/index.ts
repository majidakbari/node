import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleResponseHeaders,
    validationMiddleware
} from "./common";

export default [handleCors, handleBodyRequestParsing, handleCompression, handleResponseHeaders, validationMiddleware];
