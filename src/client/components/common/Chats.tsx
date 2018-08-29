
/**
 * Component to display user chat messages.
 * @author  Isha CHopde
 */

import * as React from "react";
import {UserTypes, ChatsTypes} from "../../types/types";
interface IProps {
    chats: ChatsTypes | any;
    user: any;
    backgroundColor: string;
}

export class Chats extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }
    public render() {
    const { chats, user, backgroundColor } = this.props;
    if (!chats) {
        return "";
    }

    const renderChats = chats.map((message, index) => {
        const messageTime = (index === chats.length - 1) ? (
            <div className="last-msg-time">
                    Just now
            </div>
        ) : "";

        if (message.receiverId !== user.username) {
            return (
                <div key={index}>
                    <div className="msg-right" style={{ background: backgroundColor}}>
                        <p>{message.message}</p>
                    </div>
                    {messageTime}
                </div>
            );
        } else {
            return (
                <div key={index}>
                    <div className="msg-left">
                        <p>{message.message}</p>
                    </div>
                    {messageTime}
                </div>
            );
        }
    });
    return (
        <div className="chat-history">
            {renderChats}
        </div>
    );
    }
}
