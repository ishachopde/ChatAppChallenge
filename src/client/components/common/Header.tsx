
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

    public componentDidMount() {
        if (this.props.chatBoard.isOnline) {
            this.startOnlineTimer();
            clearInterval(this.offlinetimer);
        } else {
            this.startOfflineTimer();
            clearInterval(this.ontimer);
        }
    }

    public componentWillUnmount() {
        clearInterval(this.ontimer);
        clearInterval(this.offlinetimer);
    }

    public render() {
        const { onlineCount, offlineCount, isOnline } = this.props.chatBoard;
        const statusDropDownClass = (isOnline) ? "border-online" : "border-offline";
        return (
            <div className="header bg">
                <a href="#default" className="logo bg">Support Chat Challenge - {this.props.user.username}</a>
                <div className="headerrightitems">
                    <div className={`selectWrapper ${statusDropDownClass}`}>
                            <select className="selectBox" onChange={this.changeStatusChange.bind(this)}>
                            <option>Online</option>
                            <option>Offline</option>
                            <option>logout</option>
                        </select>
                    </div>
                    <div className="headertimers12">
                        <div className="header-timer-divs">
                                    <div>AWAY - {this.formatSeconds(offlineCount)} </div>
                                    <div> ONLINE - {this.formatSeconds(onlineCount)} </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    private formatSeconds(totalSeconds) {
        const seconds: number = totalSeconds % 60;
        const minutes: number = Math.floor(totalSeconds / 60);
        const hours = Math.floor(totalSeconds / 3600);
        let secondsString: string = seconds.toString();
        let minuteString: string = minutes.toString();
        let hoursString: string = hours.toString();
        if (seconds < 10) {
            secondsString = "0" + secondsString;
        }

        if (minutes < 10) {
            minuteString = "0" + minuteString;
        }
        if (hours < 10) {
            hoursString = "0" + hoursString;
        }
        return hoursString + ":" + minuteString + ":" + seconds;
    }

    private startOnlineTimer() {
        this.ontimer = setInterval(() => {
            this.props.dispatch(changeOnlineCounter());
        }, 1000);
    }

    private startOfflineTimer() {
        this.offlinetimer = setInterval(() => {
            this.props.dispatch(changeOfflineCounter());
        }, 1000);
    }

    private changeStatusChange(event) {
        const status = event.target.value;

        if (status.toLowerCase() === "online") {
            this.startOnlineTimer();
            clearInterval(this.offlinetimer);
            this.props.dispatch(setUserOnlineStatus(true));
        } else if (status.toLowerCase() === "offline") {
            this.startOfflineTimer();
            clearInterval(this.ontimer);
            this.props.dispatch(setUserOnlineStatus(false));
        } else {
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
