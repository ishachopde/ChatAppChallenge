/**
 * Create redux store with provided reducers.
 * @author  Isha CHopde
 */

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
let store = null;
import {chatMiddleware} from "./chat-middlerware";
import chatsReducer from "./reducers/ChatsReducer";
import SupportReducer from "./reducers/SupportReducer";
import connectedUsersReducer from "./reducers/ConnectedUsers";
import thunkMiddleware from "redux-thunk";
import AuthenticationReducer from "./reducers/AuthenticationReducer";
import RegistrationReducer from "./reducers/RegistrationReducer";
import AlertReducer from "./reducers/AlertReducer";
export const configure = (initialState) => {
    const appReducer = combineReducers({
        authentication: AuthenticationReducer,
        registration: RegistrationReducer,
        alert: AlertReducer,
        chats: chatsReducer,
        support: SupportReducer,
        connectedUsers: connectedUsersReducer,
    });

    // Create store from combined reducers and initial state.
    store = createStore(appReducer, initialState, compose(
        applyMiddleware(chatMiddleware, thunkMiddleware),
    ));

    return store;
};

export const getStore = () => {
    return store;
};
