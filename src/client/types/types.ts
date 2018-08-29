/**
 * Typescript types definitions for different objects.
 * @author  Isha CHopde
 */

export interface user_types {
    name: string;
    isAgent: boolean;
    id: string;
    isOnline: boolean;
    onlineCount: number;
    offlineCount: number;
    lastMessageTimer: number;
}

export interface chatBoard_types {
    chatBoardId: string;
    isOnline: boolean;
    onlineCount: number;
    offlineCount: number;
    lastMessageTimer: number;
}

export interface chats_types {
    name: string;
    isAgent: boolean;
    id: string;
    isOnline: boolean;
    onlineCount: number;
    offlineCount: number;
}

export interface agent_types {
    userName: string;
    id: string;
    isOnline: boolean;
}

export interface connected_users_types {
    connectedUsers: [user_types];
}