import * as mongoose from 'mongoose';
import User from './user.interface';
import * as bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    let password = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (err, success) => {
            if (err) return reject(err);
            return resolve(success);
        });
    });
};


const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
