
/**
 * Component displays page related to agent chat window screen.
 * @author  Isha CHopde
 */

import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import "../resources/styles/loginstyles.css";

import { userAuthActions } from "../actions/userAuthAction";

interface IProps {
    registering?;
    dispatch?;
    history?;
    alert;
}

interface IState {
    user: {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
        isSupport: boolean;
    };
    submitted: boolean;
}

class RegisterPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                username: "",
                password: "",
                isSupport: false,
            },
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render(): React.ReactNode {
        const { registering, alert  } = this.props;
        const { user, submitted } = this.state;
        return (

            <div className="content-main ">
                <div className="w3ls-subscribe register">
                    <h4>Please Sign Up</h4>
                    <hr className="colorgraph"/>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={"form-group" + (submitted && !user.firstName ? " has-error" : "")}>
                            <label className="font"htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} placeholder="e.g John"/>
                            {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                            }
                        </div>
                        <div className={"form-group" + (submitted && !user.lastName ? " has-error" : "")}>
                            <label className="font" htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} placeholder="e.g Smith"/>
                            {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                            }
                        </div>
                        <div className={"form-group" + (submitted && !user.username ? " has-error" : "")}>
                            <label className="font" htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} placeholder="e.g jsmith"/>
                            {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={"form-group" + (submitted && !user.password ? " has-error" : "")}>
                            <label  className="font" htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} placeholder="Atleast 8 alphanumeric chars"/>
                            {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="agent-checkbox form-group font">
                            <input
                                type="checkbox"
                                id="support"
                                name="support"
                                onChange={this.handleAgentChange}
                                value="support"
                            />

                            <label className="font"> Support</label>
                            &nbsp;  &nbsp; &nbsp;By clicking <strong className="label label-primary">Support</strong>, for the first time bring Support Agent Online.
                        </div>
                        {alert ? <div className="alert alert-danger" role="alert">{alert}</div> : ""}
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <button className="btn btn-primary">Register</button>
                            <Link to="/login" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    private handleChange(event): void {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value,
            },
        });
    }

    /**
     * Handles register click event.
     * @param event
     */
    private handleSubmit(event): void {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userAuthActions.register(user));
        }
    }

    // Set IsAgent Status
    private handleAgentChange = (e): void => {
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                isSupport: e.target.checked,
            },
        });
    }
}

const mapStateToProps = (state) => {
    const { registering, alert } = state.registration;
    console.log(alert);
    return {
        registering,
        alert,
    };
};

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
