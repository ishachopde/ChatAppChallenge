/**
 * User related redux actions.
 * @author  Isha CHopde
 */

export const CHANGE_USERINFO = "change-userinfo";
export const CREATE_CHAT_BOARD = "create-chat-board";
export const AGENT_ASSIGNED = "support-assigned";
export const USER_ASSIGNED = "user-connected";
export const CHANGE_ONLINE_COUNT = "change-online-count";
export const CHANGE_OFFLINE_COUNT = "change-offline-count";
export const SET_USER_ONLINE_STATUS = "set-user-online-status";
export const SET_CONNECTED_USER_ONLINE_STATUS = "set-connected-users-online-status";
export const SET_CONNECTED_AGENT_ONLINE_STATUS = "set-connected-agent-online-status";
export const CHANGE_LAST_MESSAGE_RECEIVED_COUNTER = "change-last-message-counter";
export const SET_ACTIVE_USER = "set-active-user";
export const USER_DISCONNECTED = "user-disconnected";
export const SUPPORT_DISCONNECTED = "support-disconnected";

export function supportDisconnected() {
    return {
        type: SUPPORT_DISCONNECTED,
    };
}
export function setUserInfo(userName, isAgent, id) {
    return {
        type: CHANGE_USERINFO,
        payload: {
            userName,
            isAgent,
            id,
        },
    };
}

export function createChatBoard(chatBoardId) {
    return {
        type: CREATE_CHAT_BOARD,
        payload: {
            chatBoardId,
        },
    };
}

export function agentAssigned(agent) {
    return {
        type: AGENT_ASSIGNED,
        payload: {
            agent,
        },
    };
}

export function userConnected(user) {
    return {
        type: USER_ASSIGNED,
        payload: {
            user,
        },
    };
}

export function userDisconnected(user) {
    return {
        type: USER_DISCONNECTED,
        payload: {
            user,
        },
    };
}

export function changeOfflineCounter() {
    return {
        type: CHANGE_OFFLINE_COUNT,
    };
}

export function changeOnlineCounter() {
    return {
        type: CHANGE_ONLINE_COUNT,
    };
}

export function setUserOnlineStatus(status) {
    return {
        type: SET_USER_ONLINE_STATUS,
        payload: {
            status,
        },
    };
}

export function setConnectedUsersOnlineStatus(userId, status) {
    return {
        type: SET_CONNECTED_USER_ONLINE_STATUS,
        payload: {
            userId,
            status,
        },
    };
}

export function setAgentOnlineStatus(userId, status) {
    return {
        type: SET_CONNECTED_AGENT_ONLINE_STATUS,
        payload: {
            userId,
            status,
        },
    };
}

export function changeLastMessageReceivedCounter(userId) {
    return {
        type: CHANGE_LAST_MESSAGE_RECEIVED_COUNTER,
        payload: {
            userId,
        },
    };
}

export function setActiveUser(userId) {
    return {
        type: SET_ACTIVE_USER,
        payload: {
            userId,
        },
    };
}
