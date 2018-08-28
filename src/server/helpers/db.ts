import config from '../config';
import * as mongoose from 'mongoose';
import userModel from '../models/user';
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;
export default {
    User: userModel
};