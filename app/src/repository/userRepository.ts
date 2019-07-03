import {abstractRepository} from "./abstractRepository";
import userModel from "../entity/user";

/**
 * @class userRepository
 */
export class userRepository extends abstractRepository{

    constructor(){
        super(userModel);
    }

    /**
     *
     * @param email
     */
    async findOneByEmail(email: String) {
        return await this.model.findOne({'email': email});
    }

    /**
     * @param criteria
     */
    async findOneByCriteria(criteria: Object) {
        return await this.model.findOne(criteria);
    }

    /**
     * @param ids
     */
    async findManyByIds(ids: any) {
        return await this.model.find({_id: {$in : ids}}, {"_id": 1, "email": 1, "name": 1});
    }
}
