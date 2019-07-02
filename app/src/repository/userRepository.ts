import userModel from "../entity/user";
import {ObjectId} from "bson";

export class userRepository {

    async create(data: object) {
        return await userModel.create({
            ...data
        });
    }

    async findOneByEmail(email: String) {
        return await userModel.findOne({'email' : email});
    }

    async findOneByCriteria(criteria: Object) {
        return await userModel.findOne(criteria);
    }

    async findOneAndUpdate(id: string, postData: Object, options: Object = {}) {
        return await userModel.updateOne({
            _id: new ObjectId(id)
        }, {"$set" : postData}, options);
    }
}
