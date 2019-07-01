
export abstract class HTTPClientError extends Error {

    readonly statusCode!: number;
    readonly name!: string;

    /**
     * @param message
     */
    protected constructor(message: object | string, details: Object[]) {
        // if (message instanceof Object) {
        //     console.log('majid va farhad ', message);
        //     super(JSON.stringify(message));
        // } else {
            super(JSON.stringify({
                "error" : message,
                "details" : details
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
