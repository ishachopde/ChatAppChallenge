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

    /**
     * Executes when user is disconnected from the system,
     *
     * @param {*} socket - Current socket
     * @param {*} user - Currently logged in user.
     * @memberof ChatController
     */
    public userDisconnected(socket, user) {
        // If user is support remove him from the support pool and notifiy user that support disconnected.
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
            // If user is not support, remove him from the userpool and notify support - user is disconnected
            const support = userPool[user.username].support;
            if (support) {
                support.socket.emit("user-disconnected", user);
            }
            delete userPool[user.username];
        }
    }

    /**
     *  Executes when user is connected to the system.
     *
     * @param {*} socket - Current socket
     * @param {*} user - Currently logged in user.
     * @memberof ChatController
     */
    public userConnected(socket, user) {
        // Add user to the userpool.
        userPool[user.username] = {
            socket,
            userName: user.username,
            id: user.username,
        };

        // If user is support, also add him to the support pool.
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

            // Get random support from support pool.
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

    /**
     * Socket listeners.
     *
     * @param {*} io - IO object
     * @param {*} socket Current socket
     * @param {*} user - Currently logged in user.
     * @memberof ChatController
     */
    public on(io, socket, user) {
        // When message is received.
        socket.on("message", (msg) => {
            // Set sender Information from currently logged in user.
            msg.senderId = user.username;

            const receiverId = msg.receiverId;

            const receiver = userPool[receiverId];

            // Send message to the receiver.
            receiver.socket.emit("message", msg);
        });

        // Send user status change information to the support and vice versa.
        socket.on("user-status-change", (data) => {
            const { username, isSupport } = user;
            const { isOnline } = data;
            let connectedUsers = [];
            connectedUsers = (isSupport) ? supports[username].connectedUsers : [userPool[username].support.id];

            // For every connected user, send message.
            connectedUsers.forEach((connectedUser) => {
                userPool[connectedUser].socket.emit("user-status-change", user);
            });
        });
    }
}
