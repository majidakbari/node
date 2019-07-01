"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
exports.connectToMongo = () => {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, } = process.env;
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, { useNewUrlParser: true });
    mongoose.se;
};
//# sourceMappingURL=mongodb.js.map