import * as expressJwt from "express-jwt";
import config from "../config";
import userService from "../service/user";

export default jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don"t require authentication
            "/users/authenticate",
            "/users/register",
            "/",
        ],
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
}
