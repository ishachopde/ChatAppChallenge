
/**
 * Component displays page related to agent chat window screen.
 * @author  Isha CHopde
 */

import * as React from "react";
import { sendMessageToAgent } from "../actions/messageActions";
import { changeLastMessageReceivedCounter, setActiveUser } from "../actions/userActions";
import { getStore } from "../store";
import "../resources/styles/components/chat/ChatBox.scss";
import { Header } from "./common/Header";
import { connect } from "react-redux";
import { Chats } from "./common/Chats";
import { HorizontalUserList } from "./common/HorizontalUserLIst";
import {UserTypes, ChatsTypes, ConnectedUsersTypes} from "../types/types";
import { Colors as backgroundColors} from "../utils/Colors";

interface IProps {
    user: any;
    connectedUsers: UserTypes[];
    chats: ChatsTypes;
    dispatch?;
    history?;
}

interface IState {
    activeChats: any;
    inputMessages: any;
    value: string;
    currentlyChattingUser: string;
    suggestions?;
}

class AgentChatClass extends React.Component<IProps, IState> {
    private lastMessageTimers = {};
    private chatWindowWidth = 448;
    private marginBetweenTwoChatWindows = 12;
    constructor(props: IProps) {
        super(props);
        const { connectedUsers, user } = this.props;
        // If user does not exists, take him to the home screen.
        if (!user.username) {
            this.props.history.push("/login");
        }
        this.state = {
            activeChats: [],
            inputMessages: {},
            value: "",
            currentlyChattingUser: "",
            suggestions: {},
        };
    }

    // Render Agent Chat.
    public render(): React.ReactNode {
        /* This calculations can be done in constructor for faster perfomance, but for the demo
        with different screen Sizes calculating every time. */
        const maxActiveChats = this.calculateNumberOfChats(window.innerWidth);
        const activeChats = this.props.connectedUsers.slice(0, maxActiveChats);
        const inactiveChats = this.props.connectedUsers.slice(maxActiveChats, this.props.connectedUsers.length);
        return (
            <div>
                <Header />
                <HorizontalUserList maxActiveChats={maxActiveChats} inactiveChats={inactiveChats} setActiveUser={this.setActiveUser.bind(this)} />
                {this.renderActiveChats.call(this, maxActiveChats, activeChats)}
            </div>
        );
    }

    /**
     * Render current active chats.
     * @param maxActiveChats Renders current active chats.
     * @param activeChats - active chats as per the screen size.
     */
    public renderActiveChats(maxActiveChats, activeChats) {
        const { chats, user } = this.props;
        const { inputMessages, currentlyChattingUser } = this.state;
        return activeChats.map((activeChat, index) => {
            const inputMessage = (inputMessages[activeChat.id] ? inputMessages[activeChat.id] : "");
            if (activeChat.isNewMessage) {
                this.startMessageReceivedTimer(activeChat.id);
            } else {
                if (this.lastMessageTimers.hasOwnProperty(activeChat.id)) {
                    clearInterval(this.lastMessageTimers[activeChat.id]);
                    delete this.lastMessageTimers[activeChat.id];
                }
            }

            const left = (index * this.chatWindowWidth) + (index + 1) * this.marginBetweenTwoChatWindows;
            const backgroundColor = backgroundColors[index % maxActiveChats];
            let boxAnimation = "none";
            // Remind Agent to reply, if haven"t replied in one minute.
            if (activeChat.lastMessageTimer > 60) {
                boxAnimation = `blink-${backgroundColor.replace("#", "")} .5s step-end infinite alternate`;
            }

            const activeChatBorder = (currentlyChattingUser === activeChat.id) ? `4px solid ${backgroundColor}` : "";
            return (
                <div key={index}  className="msg_box" style={{ left, animation: boxAnimation, border: activeChatBorder }}>
                    <div className="msg_head">
                        <div className="chat-timer" style={{ background: backgroundColor }}>
                            <span className="chat-timer-text"> {this.formatSeconds(activeChat.lastMessageTimer)}</span>
                        </div>
                        <h4>{activeChat.name}</h4>
                    </div>

                    <div className="msg_wrap">
                        <div className="msg_body">
                            <div className="msg_push">
                                <Chats chats={chats[activeChat.id]} user={user} backgroundColor={backgroundColor} />
                            </div>
                        </div><div className="msg_footer">
                            <div className="msg_footer_info_box">
                                {
                                    (!activeChat.isOnline) ? "User offline" : ""
                                }
                            </div>
                            <textarea
                                value={inputMessage}
                                placeholder="Type a message.."
                                className="msg_input"
                                disabled={!activeChat.isOnline}
                                onKeyPress={(ev) => this.handleKeyPress(ev, activeChat.id)}
                                onFocus={() => this.onInputFocused(activeChat.id)}
                                onChange={(ev) => this.handleMessageChange.call(this, ev, activeChat.id)}
                                onBlur={this.inInputBlurred.bind(this)}
                                rows={4}
                            />
                        </div>
                    </div>
                </div>
            );
        });
    }

    /**
     * Clear all timers on unmount.
     */
    public componentWillUnmount(): void {
        Object.keys(this.lastMessageTimers).forEach((key) => {
            clearInterval(this.lastMessageTimers[key]);
        });
    }

    // On Focus get current focused user.
    private onInputFocused(userId): void {
        this.setState({
            currentlyChattingUser: userId,
        });
    }

    /**
     * Set current user to null if no window is focused.
     */
    private inInputBlurred(): void {
        this.setState({
            currentlyChattingUser: "",
        });
    }

    private handleMessageChange = (e, userId): void => {
        const inputMessages = this.state.inputMessages;
        inputMessages[userId] = e.target.value;

        this.setState({
            inputMessages,
        });
    }

    /**
     * Handler send message.
     * @param ev 
     * @param receiverId - receiver user id.
     */
    private handleKeyPress(ev, receiverId): void {
        const { inputMessages } = this.state;
        const message = (inputMessages[receiverId] ? inputMessages[receiverId] : "");
        if (ev.which === 13) {
            const store = getStore();

            // Send message.
            store.dispatch(sendMessageToAgent({
                receiverId,
                message,
            }));

            const inputMessages = this.state.inputMessages;
            inputMessages[receiverId] = "";
            this.setState({
                inputMessages,
            });

            ev.preventDefault();
        }
    }

    // Calculate the number of chats windows that can be opened.
    private calculateNumberOfChats(screenWidth): number {
        const noChatWindows = Math.floor(screenWidth / (this.chatWindowWidth + this.marginBetweenTwoChatWindows));
        return noChatWindows;
    }

    /**
     * Set message received timer for user id.
     * @param id USer id.
     */
    private startMessageReceivedTimer(id): void {
        if (!this.lastMessageTimers.hasOwnProperty(id)) {
            this.lastMessageTimers[id] = setInterval(() => {
                this.props.dispatch(changeLastMessageReceivedCounter(id));
            }, 1000);
        }
    }

    /**
     * Set active user.
     * @param userId - user id.
     */
    private setActiveUser(userId): void {
        this.props.dispatch(setActiveUser(userId));
    }

    /**
     * Format seconds to ss or mm or hh.
     * @param totalSeconds - seconds
     */
    private formatSeconds(totalSeconds): string {
        const seconds: number = totalSeconds % 60;
        const minutes: number = Math.floor(totalSeconds / 60);
        const hours = Math.floor(totalSeconds / 3600);

        if (hours !== 0) {
            return `${hours}h`;
        }

        if (minutes !== 0) {
            return `${minutes}m`;
        }

        return `${seconds}s`;
    }
}

const mapStateToProps = (state) => {
    const user = state.authentication.user || {};
    return {
        user,
        connectedUsers: state.connectedUsers,
        chats: state.chats,
    };
};

export const AgentChat = connect(
    mapStateToProps,
)(AgentChatClass);
