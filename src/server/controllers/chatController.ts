/*
 * Controller to handle socket request related to Chat
 * @author  Isha CHopde
 */
import BaseController from "./baseController";
// Stores the user information.
// tslint:disable-next-line:prefer-const
let userPool = {};

// Store the support information.
// tslint:disable-next-line:prefer-const
let supports = {};
export default class ChatController extends BaseController {
    constructor() {
        super();
    }

    public userDisconnected(socket, user) {
        if (user.isSupport) {
            const connectedUsers = supports[user.username].connectedUsers;
            connectedUsers.forEach((connectedUser) => {
                if (userPool[connectedUser]) {
                    userPool[connectedUser].socket.emit("support-disconnected", user);
                }
            });
            delete supports[user.username];
            delete userPool[user.username];
        } else {
            const support = userPool[user.username].support;
            if (support) {
                support.socket.emit("user-disconnected", user);
            }
            delete userPool[user.username];
        }
    }

    public userConnected(socket, user) {
        userPool[user.username] = {
            socket,
            userName: user.username,
            id: user.username,
        };

        if (user.isSupport) {
            supports[user.username] = {
                socket,
                userName: user.username,
                id: user.username,
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
                userPool[user.username] = {
                    ...userPool[user.username],
                    support,
                };
                supports[support.userName] = {
                        ...supports[support.userName],
                        connectedUsers: [
                            ...supports[support.userName].connectedUsers,
                            user.username, // Add new user to the agent connected user list.
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
                    name: user.username,
                    id: user.username,
                    isOnine: true,
                });
            }
        }
    }

    public on(io, socket, user) {
        socket.on("message", (msg) => {
            // Set sender Information.
            msg.senderId = user.username;

            const receiverId = msg.receiverId;

            const receiver = userPool[receiverId];
            receiver.socket.emit("message", msg);
        });

        // this.socket.on("agent-assigned", (data) => {
        // });

        socket.on("user-status-change", (data) => {
            const { username, isSupport } = user;
            const { isOnline } = data;
            let connectedUsers = [];
            connectedUsers = (isSupport) ? supports[username].connectedUsers : [userPool[username].agent.id];

            connectedUsers.forEach((connectedUser) => {
                userPool[connectedUser].socket.emit("user-status-change", user);
            });
        });
    }
}
