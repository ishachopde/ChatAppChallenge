/**
 * Typescript types definitions for different objects.
 * @author  Isha CHopde
 */

export interface UserTypes {
    name: string;
    isAgent: boolean;
    id: string;
    isOnline: boolean;
    onlineCount: number;
    offlineCount: number;
    lastMessageTimer: number;
}

export interface ChatsTypes {
    name: string;
    isAgent: boolean;
    id: string;
    isOnline: boolean;
    onlineCount: number;
    offlineCount: number;
}

export interface AgentTypes {
    userName: string;
    id: string;
    isOnline: boolean;
}

export interface ConnectedUsersTypes {
    connectedUsers: [UserTypes];
}