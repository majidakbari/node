import {ObjectId} from "bson";

interface User {
    _id: string|ObjectId;
    name: string;
    email: string;
    password: string|undefined;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export default User;
