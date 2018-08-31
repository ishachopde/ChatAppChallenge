/**
 * Component to render user chat functionality.
 * @author  Isha CHopde
 */
import * as React from "react";
import { sendMessageToAgent } from "../actions/messageActions";
import { getStore } from "../store";
import "../resources/styles/components/chat/ChatBox.scss";
import { Header } from "./common/Header";
import { connect } from "react-redux";
import { Chats } from "./common/Chats";
import {UserTypes, ChatsTypes, AgentTypes} from "../types/types";
import { Message } from "./common/Message";
interface IProps {
    user: any;
    chats: ChatsTypes;
    support: AgentTypes;
    dispatch?;
    history?;
}

interface IState {
    message: string;
}

class UserChatClass extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        const { user } = this.props;

        // If user does not exists, take him to the home screen.
        if (!user.username) {
            this.props.history.push("/login");
        }
        this.state = {
            message: "",
        };
    }

    // Render User Chat.
    public render(): React.ReactNode {
        const { support, user, chats } = this.props;
        if (!support.userName) {
            return (
                <div>
                    <Header />
                    <Message
                        message="No support is Assigned to the user, please run the app as a support and re login after that."
                    />
                </div>
            );
        }

        return (
            <div>
                <Header />
                <div className="msg_box" style={{left: "10px"}}>
                    <div className="msg_head">

                        <div className="chat-timer" style={{ background: "#CB6080"}}>
                            <span className="chat-timer-text"> 0s</span>
                        </div>
                        <h4>{support.userName}</h4>
                    </div>
                    <div className="msg_wrap">
                        <div className="msg_body">
                            <div className="msg_push">
                                {/* {this.renderChatHistory(chats[agent.id], user)} */}
                                <Chats chats={chats[support.userName]} user={user} backgroundColor={"#CB6080"} />
                            </div>
                        </div><div className="msg_footer">
                            <div className="msg_footer_info_box">
                                {
                                    (!support.isOnline) ? "Agent offline" : ""
                                }
                        </div>
                            <textarea
                                className="msg_input"
                                placeholder="Type a message.."
                                disabled={!support.isOnline}
                                value={this.state.message}
                                onKeyPress={this.handleKeyPress.bind(this)}
                                onChange={this.handleMessageChange.bind(this)}
                                rows={4}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private handleMessageChange = (e): void => {
        this.setState({
            message: e.target.value,
        });
    }

    // Handle message box key press.
    private handleKeyPress(ev): void {
        const { support } = this.props;
        const { message } = this.state;
        // If enter is pressed send message to support.
        if (ev.which === 13) {
            const store = getStore();
            store.dispatch(sendMessageToAgent({
                receiverId: support.userName,
                message,
            }));

            this.setState({
                message: "",
            });

            ev.preventDefault();
        }
    }
}

const mapStateToProps = (state) => {
    const user = state.authentication.user || {};
    return {
        user,
        chats: state.chats,
        support: state.support,
    };
};

export const UserChat = connect(
    mapStateToProps,
)(UserChatClass);
