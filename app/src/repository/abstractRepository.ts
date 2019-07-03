import {ObjectId} from "bson";

/**
 * @class abstractRepository
 */
export class abstractRepository {

    constructor(protected model: any){}

    /**
     * @param data
     */
    async create(data: object) {
        return await this.model.create({
            ...data
        });
    }

    /**
     * @param projection
     * @param page
     * @param perPage
     */
    async findAll(projection: Object, page: number = 1, perPage: number = 10) {
        return {
            data: await this.model.find({}, projection).limit(perPage).skip((page - 1) * perPage),
            count: await this.model.countDocuments({})
        };
    }

    /**
     * @param id
     */
    async findOneById(id: string) {
        return await this.model.findById(id);
    }


    /**
     * @param id
     * @param postData
     * @param options
     */
    async findOneAndUpdate(id: string, postData: any, options: Object = {}) {

        postData.updated_at = Date.now();
        return await this.model.updateOne({
            _id: new ObjectId(id)
        }, {"$set": postData}, options);
    }
}
