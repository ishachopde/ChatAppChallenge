/*
 * Controller to handle socket request related to Chat
 * @author  Isha CHopde
 */
import BaseController from "./baseController";
// Stores the user information.
let userPool = {};

// Store the support information.
let supports = {};
export default class ChatController extends BaseController {
    constructor() {
        super();
    }

    public on(io, socket) {
        socket.on("message", (msg) => {
            const senderId = msg.senderId;
            const receiverId = msg.receiverId;

            const receiver = userPool[receiverId];
            receiver.socket.emit("message", msg);
        });

        // this.socket.on("agent-assigned", (data) => {
        // });

        socket.on("user-status-change", (user) => {
            const { userId, isOnline, isSupport } = user;
            let connectedUsers = [];
            connectedUsers = (isSupport) ? supports[userId].connectedUsers : [userPool[userId].agent.id];

            connectedUsers.forEach((connectedUser) => {
                userPool[connectedUser].socket.emit("user-status-change", user);
            });
        });

        socket.on("create-board", (data) => {
            userPool[data.userName] = {
                socket,
                userName: data.userName,
                id: data.userName,
            };

            if (data.isSupport) {
                supports[data.userName] = {
                    socket,
                    userName: data.userName,
                    id: data.userName,
                    connectedUsers: [],
                };
            } else {

                // Get available support. Can be done separately, but for this exercise
                // assuption is support is running before we run the user.
                const randomSupport = (obj) => {
                    const keys = Object.keys(obj);
                    return obj[keys[keys.length * Math.random() << 0]];
                };

                //
                const support = randomSupport(supports);
                if (support) {
                    // Store user information in UserPool
                    userPool[data.userName] = {
                        ...userPool[data.userName],
                        support,
                    };
                    supports[support.userName] = {
                            ...supports[support.userName],
                            connectedUsers: [
                                ...supports[support.userName].connectedUsers,
                                data.userName, // Add new user to the agent connected user list.
                            ],
                        };
                    // Notify user agent is assigned.
                    socket.emit("agent-connected", {
                        userName: support.userName,
                        id: support.userName,
                        isOnline: true,
                    });

                    // Notify agent user is assigned.
                    support.socket.emit("user-connected", {
                        name: data.userName,
                        id: data.userName,
                        isOnine: true,
                    });
                }
            }
        });
    }
}
