import userModel from "../entity/user";
import {ObjectId} from "bson";

/**
 * @class userRepository
 */
export class userRepository {

    /**
     * @param data
     */
    async create(data: object) {
        return await userModel.create({
            ...data
        });
    }

    /**
     * @param email
     */
    async findOneByEmail(email: String) {
        return await userModel.findOne({'email': email});
    }

    /**
     * @param criteria
     */
    async findOneByCriteria(criteria: Object) {
        return await userModel.findOne(criteria);
    }

    /**
     * @param id
     * @param postData
     * @param options
     */
    async findOneAndUpdate(id: string, postData: any, options: Object = {}) {

        postData.updated_at = Date.now();

        return await userModel.updateOne({
            _id: new ObjectId(id)
        }, {"$set": postData}, options);
    }


    /**
     * @param id
     */
    async findOneById(id: string) {

        return await userModel.findById(id);
    }

    /**
     * @param projection
     * @param page
     * @param perPage
     */
    async findAll(projection: Object, page: number = 1, perPage: number = 10) {
        return {
            data: await userModel.find({}, projection).limit(perPage).skip((page - 1) * perPage),
            count: await userModel.countDocuments({})
        };
    }

    /**
     * @param ids
     */
    async findManyByIds(ids: any) {
        return await userModel.find({_id: {$in : ids}}, {"_id": 1, "email": 1, "name": 1});
    }
}
