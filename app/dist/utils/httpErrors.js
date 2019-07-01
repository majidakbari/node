"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HTTPClientError extends Error {
    /**
     * @param message
     */
    constructor(message, details) {
        // if (message instanceof Object) {
        //     console.log('majid va farhad ', message);
        //     super(JSON.stringify(message));
        // } else {
        super(JSON.stringify({
            "error": message,
            "details": details
        }));
        // }
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HTTPClientError = HTTPClientError;
class HTTP400Error extends HTTPClientError {
    constructor(message = "Bad Request") {
        super(message, []);
        this.statusCode = 400;
    }
}
exports.HTTP400Error = HTTP400Error;
class HTTP422Error extends HTTPClientError {
    constructor(details) {
        super("Unprocessable Entity", details);
        this.statusCode = 422;
    }
}
exports.HTTP422Error = HTTP422Error;
class HTTP404Error extends HTTPClientError {
    constructor(message = "Not found") {
        super(message, []);
        this.statusCode = 404;
    }
}
exports.HTTP404Error = HTTP404Error;
//# sourceMappingURL=httpErrors.js.map