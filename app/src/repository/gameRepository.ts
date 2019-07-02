import {ObjectId} from "bson";
import gameModel from "../entity/game";

/**
 * @class gameRepository
 */
export class gameRepository {

    /**
     * @param data
     */
    async create(data: object) {
        return await gameModel.create({
            ...data
        });
    }

    /**
     * @param id
     */
    async findOneById(id: string) {
        return await gameModel.findById(id);
    }

    /**
     * @param projection
     * @param page
     * @param perPage
     */
    async findAll(projection: Object, page: number = 1, perPage: number = 10) {
        return {
            data: await gameModel.find({}, projection).limit(perPage).skip((page - 1) * perPage),
            count: await gameModel.countDocuments({})
        };
    }

    /**
     * @param id
     * @param postData
     * @param options
     */
    async findOneAndUpdate(id: string, postData: any, options: Object = {}) {

        postData.updated_at = Date.now();

        return await gameModel.updateOne({
            _id: new ObjectId(id)
        }, {"$set": postData}, options);
    }
}
