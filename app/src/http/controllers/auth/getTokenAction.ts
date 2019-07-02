import {Request, Response} from "express";
import {HttpSuccess} from "../../../utils/httpSuccess";
import * as jwt from "jwt-simple";
import * as passport from "passport";
import * as moment from "moment";
import {Strategy, ExtractJwt} from "passport-jwt";
import {userRepository} from "../../../repository/userRepository";
import User from "../../../entity/user.interface";
import {HTTP401Error} from "../../../utils/httpErrors";

/**
 * @class getTokenAction
 */
export class getTokenAction {

    /**
     * @param repo
     */
    constructor(private repo: userRepository) {
    }

    /**
     * @param req
     * @param res
     */
    async invoke(req: Request, res: Response) {
        try {
            let user = await this.repo.findOneByEmail(req.body.email);

            if (user === null) throw "User not found";

            let success = await user.comparePassword(req.body.password);
            if (success === false) throw "";

            return HttpSuccess(res, this.genToken(user));
        } catch (err) {
            res.status(401).json({
                "error": "Unauthenticated",
                "details": [{
                    "reason" : "Invalid credentials"
                }]
            });
        }


    }

    public initialize() {
        passport.use("jwt", this.getStrategy());
        return passport.initialize();
    };


    /**
     * returning the auth strategy which is password grant here
     */
    private getStrategy() {

        const params = {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            passReqToCallback: true
        };

        return new Strategy(params, (req: Request, payload: any, done: any) => {

            this.repo.findOneByEmail(payload.email).then(
                (user) => {
                    if (user === null) {
                        return done(null, false, {message: "The user in the token was not found"});
                    }
                    return done(null, {_id: user._id, username: user.email});
                }
            ).catch(
                (err) => {
                    return done(err);
                }
            );


        });
    }

    /**
     * @param callback
     */
    public authenticate(callback: any) {
        passport.authenticate("jwt", {
            session: false,
            failWithError: true
        }, callback);
    }


    /**
     * @param user
     */
    private genToken(user: User): Object {
        let expires = moment.default().utc().add({days: 7}).unix();
        let token = jwt.encode({
            exp: expires,
            username: user.email
        }, process.env.JWT_SECRET || '');

        return {
            token_type: 'Bearer',
            expires: moment.unix(expires).format(),
            access_token: token,
        };
    }
}

