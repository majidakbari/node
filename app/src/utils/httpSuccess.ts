import {Response} from "express";

export function HttpSuccess (res:Response , data: any, status: number = 200, message: string = 'Success'){

    return res.status(status).json({
        "message" : message,
        "data" : data
    });
}

