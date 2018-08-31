
/**
 * Component to display header.
 * @author  Isha CHopde
 */
import * as React from "react";
import { connect } from "react-redux";
import "../../resources/styles/components/common/Header.scss";
import { changeOnlineCounter, changeOfflineCounter, setUserOnlineStatus } from "../../actions/userActions";
import {ChatBoardTypes} from "../../types/types";
import { history } from "../../helpers";
interface IProps {
    chatBoard: ChatBoardTypes;
    user: any;
    dispatch?;
    history?;
}

interface IState {
    onlineCount: number;
    offlineCount: number;
}
export class HeaderClass extends React.Component<IProps, IState> {
    private offlinetimer;
    private ontimer;
    constructor(props) {
        super(props);
    }

    public render() {
        const { onlineCount, offlineCount, isOnline } = this.props.chatBoard;
        const statusDropDownClass = (isOnline) ? "border-online" : "border-offline";
        return (
            <div className="header bg">
                <a href="#default" className="logo bg font">Support Chat Challenge - {this.props.user.username}</a>
                <div className="headerrightitems">
                    <div className={`selectWrapper ${statusDropDownClass}`}>
                            <select className="selectBox" onChange={this.changeStatusChange.bind(this)}>
                            <option>logout</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    private changeStatusChange(event) {
        const status = event.target.value;
        if (status.toLowerCase() === "logout") {
            history.push("/login");
        }
    }
}

const mapStateToProps = (state) => {
    const user = state.authentication.user || {};
    return {
        user,
        chatBoard: state.chatBoard,
    };
};

export const Header = connect(
    mapStateToProps,
)(HeaderClass);
