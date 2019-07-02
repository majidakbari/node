import { Request, Response } from "express";
import {HttpSuccess} from "../../../utils/httpSuccess";

/**
 * @class getProfileAction
 */
export class getProfileAction {

    /**
     * @param req
     * @param res
     */
    async invoke(req: Request, res: Response) {

        return HttpSuccess(res, {'hi' : 'nokaram'});
    }
}
