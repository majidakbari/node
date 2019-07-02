export abstract class HTTPClientError extends Error {

    readonly statusCode!: number;
    readonly name!: string;

    /**
     * @param message
     * @param details
     */
    protected constructor(message: object | string, details: Object[]) {
        super(JSON.stringify({
            "error": message,
            "details": details
        }));
        // }
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class HTTP400Error extends HTTPClientError {

    readonly statusCode = 400;

    constructor(message: string | object = "Bad Request") {
        super(message, []);
    }
}

export class HTTP401Error extends HTTPClientError {

    readonly statusCode = 401;

    constructor(message: string | object ) {
        super("Unauthenticated", [{
            "reason" : message
        }]);
    }
}

export class HTTP422Error extends HTTPClientError {

    readonly statusCode = 422;

    constructor(details: object[]) {
        super("Unprocessable Entity", details);
    }
}

export class HTTP404Error extends HTTPClientError {
    readonly statusCode = 404;

    constructor(message: string | object = "Not found") {
        super(message, []);
    }
}
