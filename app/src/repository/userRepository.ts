import userModel from "../entity/user";

export class userRepository {

    async create(data: object) {
        return await userModel.create({
            ...data
        });
    }

    async findOneByEmail(email: String) {
        return await userModel.findOne({'email' : email});
    }
}
