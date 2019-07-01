const mongoose = require('mongoose');

export const connectToMongo = () => {
    const {
        MONGO_USER,
        MONGO_PASSWORD,
        MONGO_PATH,
    } = process.env;

    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, { useNewUrlParser: true });
    mongoose.se
};
