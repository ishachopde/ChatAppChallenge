/**
 * User related redux actions.
 * @author  Isha CHopde
 */

import { userConstants } from "../_constants";

export function supportDisconnected() {
    return {
        type: userConstants.SUPPORT_DISCONNECTED,
    };
}
export function setUserInfo(userName, isAgent, id) {
    return {
        type: userConstants.CHANGE_USERINFO,
        payload: {
            userName,
            isAgent,
            id,
        },
    };
}

export function createChatBoard(chatBoardId) {
    return {
        type: userConstants.CREATE_CHAT_BOARD,
        payload: {
            chatBoardId,
        },
    };
}

export function agentAssigned(agent) {
    return {
        type: userConstants.AGENT_ASSIGNED,
        payload: {
            agent,
        },
    };
}

export function userConnected(user) {
    return {
        type: userConstants.USER_ASSIGNED,
        payload: {
            user,
        },
    };
}

export function userDisconnected(user) {
    return {
        type: userConstants.USER_DISCONNECTED,
        payload: {
            user,
        },
    };
}

export function changeOfflineCounter() {
    return {
        type: userConstants.CHANGE_OFFLINE_COUNT,
    };
}

export function changeOnlineCounter() {
    return {
        type: userConstants.CHANGE_ONLINE_COUNT,
    };
}

export function setUserOnlineStatus(status) {
    return {
        type: userConstants.SET_USER_ONLINE_STATUS,
        payload: {
            status,
        },
    };
}

export function setConnectedUsersOnlineStatus(userId, status) {
    return {
        type: userConstants.SET_CONNECTED_USER_ONLINE_STATUS,
        payload: {
            userId,
            status,
        },
    };
}

export function setAgentOnlineStatus(userId, status) {
    return {
        type: userConstants.SET_CONNECTED_AGENT_ONLINE_STATUS,
        payload: {
            userId,
            status,
        },
    };
}

export function changeLastMessageReceivedCounter(userId) {
    return {
        type: userConstants.CHANGE_LAST_MESSAGE_RECEIVED_COUNTER,
        payload: {
            userId,
        },
    };
}

export function setActiveUser(userId) {
    return {
        type: userConstants.SET_ACTIVE_USER,
        payload: {
            userId,
        },
    };
}
