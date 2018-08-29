/**
 * Initial state of the store.
 * @author  Isha CHopde
 */

export default {
    authentication: {},
    registration: {},
    alert: {},
    support: {
        userName: "",
        isOnline: false,
    },
    chatBoard: {
        chatBoardId: "",
        isOnline: false,
        onlineCount: 0,
        offlineCount: 0,
        lastMessageTimer: 0,
    },
    connectedUsers: [],
    chats: {},
};
