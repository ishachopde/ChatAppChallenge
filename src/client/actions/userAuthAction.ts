
/**
 * User Auth related redux actions.
 * @author  Isha CHopde
 */

import { userAuthApis } from "../apis/userAuthApi";
import { alertActions } from "./alertActions";
import { history } from "../helpers";
import { userConstants } from "../_constants";
import { createChatBoard } from "./userActions";
import { getStore } from "../store";
import startChat from "../chat-middlerware";
const store = getStore();
export const userAuthActions = {
    login,
    logout,
    register,
    delete: _delete,
};
function login(username, password) {
    return (dispatch) => {
        dispatch(request({ username }));
        userAuthApis.login(username, password)
            .then((user) => {
                    dispatch(success(user));
                    // Pass chat middlerware our instance of store.
                    startChat(dispatch, user.token);
                    // Send User Information to Server.
                    dispatch(createChatBoard(user.username));
                    if (user.isSupport) {
                        history.push("/support");
                    } else {
                        history.push("/user");
                    }
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }
}
function logout() {
    userAuthApis.logout();
    return { type: userConstants.LOGOUT };
}
function register(user) {
    return (dispatch) => {
        dispatch(request(user));
        userAuthApis.register(user)
            .then(
                (user) => {
                    console.log("then hi");
                    dispatch(success(user));
                    history.push("/login");
                    dispatch(alertActions.success("Registration successful"));
                },
                (error) => {
                    console.log("hi");
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
    };
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user }; }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error }; }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return (dispatch) => {
        dispatch(request(id));
        userAuthApis.delete(id)
            .then(
                (user) => dispatch(success(id)),
                (error) => dispatch(failure(id, error.toString())),
            );
    };
    function request(id) { return { type: userConstants.DELETE_REQUEST, id }; }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id }; }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error }; }
}
