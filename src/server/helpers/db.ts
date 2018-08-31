/**
 * Expose models.
 * @author  Isha CHopde
 */

import config from "../config";
import * as mongoose from "mongoose";
import userModel from "../models/user";
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useNewUrlParser: true }).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    (err) => { console.log("\x1b[31m", "\n Mongo Db not connected. \n"); },
  );
mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;
export default {
    User: userModel,
};
