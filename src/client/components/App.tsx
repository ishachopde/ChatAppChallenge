
/**
 * Component to setup routing for application..
 * @author  Isha CHopde
 */
import * as React from "react";
import { Router, Route, Switch, Redirect} from "react-router-dom";
import { UserChat } from "./UserChat";
import { AgentChat } from "./AgentChat";
import "../resources/styles/components/App.scss";
import { PrivateRoute } from "./common/PrivateRoute";
// import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { history } from "../helpers";
import { RegisterPage } from "./RegisterPage";
import { HomePage } from "./HomePage";
interface IProps {
    dispatch?;
}

export class App extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Router history={history}>
                <div className="container">
                    <PrivateRoute exact path="/" component={HomePage} />
                    <PrivateRoute exact path="/user" component={UserChat} />
                    <PrivateRoute exact path="/support" component={AgentChat} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                </div>
            </Router>
        );
      }
}
