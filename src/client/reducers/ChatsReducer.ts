/**
 * reducer to handle actions related to Chats.
 * @author  Isha CHopde
 */

import initialState from "../initialState";

export default (state = initialState.chats, action) => {
    switch (action.type) {
        case "message-sent":
            const receiverId = action.payload.message.receiverId;
            const messages = state[receiverId];

            if(!messages) {
                state[receiverId] = [action.payload.message];
                return Object.assign({}, state);
            } else {
                state[receiverId] = [
                    ...state[receiverId],
                    action.payload.message,
                ];

                return Object.assign({}, state);
            }
        case "message-received":
            const senderId = action.payload.message.senderId;
            const msgs = state[senderId];
            if (!msgs) {
                state[senderId] = [action.payload.message];
                return Object.assign({}, state);
            } else {
                state[senderId] = [
                    ...state[senderId],
                    action.payload.message,
                ];

                return Object.assign({}, state);
            }
        default:
            return state;
    }
};
