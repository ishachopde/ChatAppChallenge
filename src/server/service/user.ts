/**
 * Service to interact with Mongo Db.
 * @author  Isha CHopde
 */

import config from "../config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import db from "../helpers/db";
const User = db.User;

export default {
    authenticate,
    getById,
    create,
    update,
    _delete,
};

/**
 * Check whether provided username password matches the record in MongoDb.
 *
 * @param {*} { username, password }
 * @returns
 */
async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ user }, config.secret);
        return {
            ...userWithoutHash,
            token,
        };
    }
}

/**
 * Get User by Id
 *
 * @param {*} id - Id of the User.
 * @returns
 */
async function getById(id) {
    return await User.findById(id).select("-hash");
}

/**
 * Create user in the system.
 *
 * @param {*} userParam - User data
 */
async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw new Error(`Username ${userParam.username} is already taken`);
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

/**
 * Updates the user information in the system.
 *
 * @param {*} id - User id
 * @param {*} userParam - Updated data.
 */
async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) {
        throw new Error("User not found");
    }
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw new Error(`Username ${userParam.username} is already taken`);
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

/**
 * Delete User from the system.
 *
 * @param {*} id - User Id.
 */
async function _delete(id) {
    await User.findByIdAndRemove(id);

}
