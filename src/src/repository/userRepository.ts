import userModel from "../entity/user";

export class userRepository {

    async create(data: object) {
        return await userModel.create({
            ...data
        });
    }
}
