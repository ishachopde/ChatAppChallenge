
/**
 * Component displays page related to agent chat window screen.
 * @author  Isha CHopde
 */

import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userAuthActions } from "../actions/userAuthAction";
import { Readme } from "./Readme";
// import "../resources/styles/loginstyles.css";

import {RegisterPage} from "./RegisterPage";
interface IProps {
    loggingIn?;
    dispatch?;
    history?;
    login;
}

class LoginPage extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        // reset login status
        this.props.dispatch(userAuthActions.logout());

        this.state = {
            username: "",
            password: "",
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Renders Login Component.
     */
    public render() {
        const { loggingIn, login } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="wthree-dot">
                <div className="profile">
                    <div className="wrap">
                        <div className="wthree-grids">
                            <div className="content-left">
                                <div className="content-info">
                                    <h2>Support Chat App</h2>
                                    <hr className="colorgraph"/>
                                    <Readme/>
                                    <div className="agile-signin">
                                        <h4>Don't have an account ? <Link to="/register" className="btn btn-link">Register</Link></h4>
                                    </div>
                                </div>
                            </div>

                            <div className="content-main">
                                <div className="w3ls-subscribe">
                                    <h4>Sign In</h4>
                                    <hr className="colorgraph"/>
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className={"form-group" + (submitted && !username ? " has-error" : "")}>
                                            <label className="font" htmlFor="username">Username</label>
                                            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} placeholder="Username"/>
                                            {submitted && !username &&
                                            <div className="help-block">Username is required</div>
                                            }
                                        </div>
                                        <div className={"form-group" + (submitted && !password ? " has-error" : "")}>
                                            <label className="font" htmlFor="password">Password</label>
                                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="Password"/>
                                            {submitted && !password &&
                                            <div className="help-block">Password is required</div>
                                            }
                                        </div>
                                        {login ? <div className="alert alert-danger" role="alert">{login}</div> : ""}
                                        <hr className="colorgraph"/>
                                        <div className="form-group">
                                            <button className="btn btn-primary">Login</button>
                                            <Link to="/register" className="btn btn-link">Register</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Handlers input change event.
     * @param e
     */
    private handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    /**
     * Handles login click event.
     * @param e
     */
    private handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userAuthActions.login(username, password));
        }
    }
}

const mapStateToProps = (state) => {
    const { loggingIn, login } = state.authentication;
    return {
        loggingIn,
        login,
    };
};

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
