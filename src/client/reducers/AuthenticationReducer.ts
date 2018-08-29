import { userConstants } from "../_constants";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export default (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user,
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                login: action.error,
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state;
    }
};