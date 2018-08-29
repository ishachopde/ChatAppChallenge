import config from "../config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import db from "../helpers/db";
const User = db.User;

export default {
    authenticate,
    getAll,
    getById,
    create,
    update,
    _delete,
};

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

async function getAll() {
    return await User.find().select("-hash");
}

async function getById(id) {
    return await User.findById(id).select("-hash");
}

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

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
