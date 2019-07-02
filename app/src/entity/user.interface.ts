import {ObjectId} from "bson";

interface User {
    _id: string|ObjectId;
    name: string;
    email: string;
    password: string|undefined;
    created_at: Date;
    updated_at: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export default User;
