/*
 * Controller to handle socket request related to Chat
 * @author  Isha CHopde
 */
import BaseController from "./baseController";

// Store the agent information.    
let agents = {};

// Stores the user information.
let userPool = {};

export default class ChatController extends BaseController {
    private io;
    private socket;
    constructor(io, socket) {
        super();
        this.io = io;
        this.socket = socket;
    }

    public on() {
        this.socket.on('message', function(msg) {
            const senderId = msg.senderId;
            const receiverId = msg.receiverId;

            const receiver = userPool[receiverId];
            receiver.socket.emit('message', msg);
        });

        this.socket.on('agent-assigned', function(data) {
            console.log(data);
        });

        this.socket.on('user-status-change', (user) => {
            const { userId, isOnline, isAgent } = user;
            let connectedUsers = []
            connectedUsers = (isAgent) ? agents[userId].connectedUsers : [userPool[userId].agent.id]

            connectedUsers.forEach(connectedUser => {
                userPool[connectedUser].socket.emit("user-status-change", user);
            });
        })

        this.socket.on('create-board', function(data) {
            userPool[data.chatBoardId] = {
                socket: this.socket,
                userName: data.userName,
                id: data.chatBoardId,
            };

            if (data.isAgent) {
                agents[data.chatBoardId] = {
                    socket: this.socket,
                    userName: data.userName,
                    id: data.chatBoardId,
                    connectedUsers: []
                };
            } else {

                // Get available agent. Can be done separately, but for this exercise
                // assuption is agent is running before we run the user.
                const randomAgent = function(obj) {
                    var keys = Object.keys(obj)
                    return obj[keys[keys.length * Math.random() << 0]];
                };


                //
                const agent = randomAgent(agents);

                // Store user information in UserPool
                userPool[data.chatBoardId] = {
                    ...userPool[data.chatBoardId],
                    agent: agent
                };

                if (agent) {
                    agents[agent.id] = {
                            ...agents[agent.id],
                            connectedUsers: [
                                ...agents[agent.id].connectedUsers,
                                data.chatBoardId // Add new user to the agent connected user list.
                            ]
                        }
                    // Notify user agent is assigned.
                    this.socket.emit('agent-connected', {
                        userName: agent.userName,
                        id: agent.id,
                        isOnline: true
                    });

                    // Notify agent user is assigned.
                    agent.socket.emit('user-connected', {
                        name: data.userName,
                        id: data.chatBoardId,
                        isOnine: true
                    })
                }

            }
        });
    }
    
}