
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
    public render(): React.ReactNode {
        const { chats, user, backgroundColor } = this.props;
        if (!chats) {
            return "";
        }

        const renderChats = chats.map((message, index) => {
            if (message.receiverId !== user.username) {
                return (
                    <div key={index}>
                        <div className="msg-right" style={{ background: backgroundColor}}>
                            <p>{message.message}</p>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div key={index}>
                        <div className="msg-left">
                            <p>{message.message}</p>
                        </div>
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
