
/**
 * Component to display header.
 * @author  Isha CHopde
 */
import * as React from "react";
import { connect } from "react-redux";
import "../../resources/styles/components/common/Header.scss";
import { Link } from 'react-router-dom';
interface IProps {
    user: any;
    dispatch?;
    history?;
}

export class HeaderClass extends React.Component<IProps, {}> {
    constructor(props) {
        super(props);
    }

    /**
     * Renders header component.
     */
    public render(): React.ReactNode {
        return (
            <div className="header bg">
                <a href="#default" className="logo bg font">Support Chat Challenge</a>
                <div className="headerrightitems">
                    <div className="headeruser"> Welcome - {this.props.user.username} </div>
                    <Link to="/login"> Logout </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const user = state.authentication.user || {};
    return {
        user,
    };
};

export const Header = connect(
    mapStateToProps,
)(HeaderClass);
