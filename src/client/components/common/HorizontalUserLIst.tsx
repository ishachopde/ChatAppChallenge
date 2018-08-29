
/**
 * Component to display horizontal user list..
 * @author  Isha CHopde
 */

import * as React from "react";
import { Colors as backgroundColors} from "../../utils/Colors";
import "../../resources/styles/components/common/HorizontalUserLIst.scss";

import {UserTypes} from "../../types/types";
interface IProps {
    inactiveChats: UserTypes[];
    maxActiveChats: number;
    setActiveUser: any;
}

export class HorizontalUserList extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }
    public render() {
        const {inactiveChats, maxActiveChats, setActiveUser} = this.props;
        if (inactiveChats.length === 0) {
            return "";
        }
        return (
            <div>
                <div className="scrollview-header">
                    Online Users
                    </div>
                <div className="scrollmenu">
                    {inactiveChats.map((inactiveChat, index) => {
                        const backgroundColor = backgroundColors[index % maxActiveChats];
                        let boxAnimation = "none";
                        // Remind Agent to reply, if haven"t replied in one minute.
                        if (inactiveChat.lastMessageTimer > 60) {
                            boxAnimation = `blink-alert .5s step-end infinite alternate`;
                        }
                        return (
                            <span onClick={(ev) => setActiveUser(inactiveChat.id)} key={index} style={{ background: backgroundColor, animation: boxAnimation }}><div>
                                {inactiveChat.name.substring(0, 1).toUpperCase()}</div>
                            </span>
                        );
                    })}
                </div>
            </div>
        );
    }
}
