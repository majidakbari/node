// import userModel from "../entity/user";
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
    //
    // /**
    //  * @param criteria
    //  */
    // async findOneByCriteria(criteria: Object) {
    //     return await userModel.findOne(criteria);
    // }
    //
    // /**
    //  * @param id
    //  * @param postData
    //  * @param options
    //  */
    // async findOneAndUpdate(id: string, postData: any, options: Object = {}) {
    //
    //     postData.updated_at = Date.now();
    //
    //     return await userModel.updateOne({
    //         _id: new ObjectId(id)
    //     }, {"$set" : postData}, options);
    // }
    //
    // /**
    //  * @param page
    //  * @param perPage
    //  */
    // async findAll(page: number = 1, perPage:number = 10){
    //     return {
    //         data: await userModel.find({}, {"_id": 1, "email": 1, "name" : 1}).limit(perPage).skip((page - 1) * perPage),
    //         count: await userModel.countDocuments({})
    //     };
    // }
}
