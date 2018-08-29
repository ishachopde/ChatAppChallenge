/**
 * Redux middler ware to handle socket related operations.
 * @author  Isha CHopde
 */

import * as io from "socket.io-client";
let socket = null;
import { agentAssigned, userConnected, userDisconnected, supportDisconnected,
    setConnectedUsersOnlineStatus, setAgentOnlineStatus } from "./actions/userActions";
import { messageReceive } from "./actions/messageActions";
export function chatMiddleware(store) {
  return (next) => (action) => {
    const result = next(action);

    // Send message to the user.
    if (socket && action.type === "message-sent") {
        socket.emit("message", action.payload.message);
    }

    // Set User status.
    if (socket && action.type === "set-user-online-status") {
        const state = store.getState();
        socket.emit("user-status-change", {
            isOnline: state.chatBoard.isOnline,
        });
    }

    return result;
  };
}

export default (dispatch, token)  => {
    // Connect with Socket only if valid token.
    socket = io({
        query: "token=" + token,
      });
    // On receiving the message.
    socket.on("message", (data) => {
        dispatch(messageReceive(data));
    });

    // On support is connectd to the user.
    socket.on("agent-connected", (data) => {
        dispatch(agentAssigned(data));
    });

    // On user is connectd to the agent.
    socket.on("user-connected", (data) => {
        dispatch(userConnected(data));
    });

    // On support disconnected.
    socket.on("support-disconnected", (support) => {
        dispatch(supportDisconnected());
    });

    // On User disconnected
    socket.on("user-disconnected", (user) => {
        dispatch(userDisconnected(user));
    });

    // On user status change, status can be Onine or Offline..
    socket.on("user-status-change", (data) => {
        if (!data.isSupport) {
            dispatch(setConnectedUsersOnlineStatus(data.userId, data.isOnline));
        } else {
            dispatch(setAgentOnlineStatus(data.userId, data.isOnline));
        }
    });
};
