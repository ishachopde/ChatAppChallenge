
/**
 * User Auth Apis.
 * @author  Isha CHopde
 */

import { authHeader } from "../helpers";

export const userAuthApis = {
    login,
    logout,
    register,
    getById,
    update,
    delete: _delete,
};

/**
 * Calls login Api with given username and password.
 *
 * @param {*} username - username of the user.
 * @param {*} password - password provided by the user.
 * @returns
 */
function login(username, password) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    };

    return fetch(`/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then((user) => {
            // login successful if there"s a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem("user", JSON.stringify(user));
            }

            return user;
        });
}

/**
 *   Logs user out of the system.
 *
 */
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
}

/**
 * Get user information using Id.
 *
 * @param {*} id
 * @returns
 */
function getById(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

/**
 * Call register user api with user provided information.
 *
 * @param {*} user
 * @returns
 */
function register(user) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };

    return fetch(`/users/register`, requestOptions).then(handleResponse);
}

/**
 * Updates user information.
 *
 * @param {*} user
 * @returns
 */
function update(user) {
    const requestOptions = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };

    return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: "DELETE",
        headers: authHeader(),
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        // console.log(data);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
