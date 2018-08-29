/**
 * Connected Users reducer for redux store..
 * @author  Isha CHopde
 */

import initialState from "../initialState";

export default (state = initialState.connectedUsers, action) => {
    switch (action.type) {
        case "user-connected":
            return [
                ...state,
                {
                    ...action.payload.user,
                    lastMessageTimer: 0,
                    isNewMessage: false,
                    isOnline: true,
                },
            ];
        case "user-disconnected":
            return state.filter((user) => user.id !== action.payload.user.username);
        case "set-connected-users-online-status":
            const { userId, status} = action.payload;
            return state.map((user) => user.id === userId ? {...user, isOnline: status} : user);
        case "message-sent":
            const { receiverId } = action.payload.message;
            return state.map((user) => user.id === receiverId ? {...user, lastMessageTimer: 0, isNewMessage: false} : user);
        case "message-received":
            const { senderId } = action.payload.message;
            return state.map((user) => user.id === senderId ? {...user, lastMessageTimer: 0, isNewMessage: true} : user);
            case "change-last-message-counter":
            return state.map((user) => user.id === action.payload.userId ? {...user, lastMessageTimer: user.lastMessageTimer + 1} : user);
        case "set-active-user":
            return [
                state.find((user) => user.id === action.payload.userId),
                ...state.filter((user) => user.id !== action.payload.userId),
        ];
        default:
            return state;
    }
};
