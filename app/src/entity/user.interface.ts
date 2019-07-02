interface User {
    _id: string;
    name: string;
    email: string;
    password: string|undefined;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export default User;
