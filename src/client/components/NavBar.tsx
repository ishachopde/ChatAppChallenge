
/**
 * Component to display footer.
 * @author  Isha CHopde
 */
import * as React from "react";
import "../resources/styles/loginstyles.css";

export class NavBar extends React.Component {
    public render() {
        return (
            <div className="jumbotron">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Support Chat App</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">Home</a></li>
                            <li><a href="#">Sign In</a></li>
                            <li><a href="#">Sign Up</a></li>
                            {/*<li><a href="#">Page 3</a></li>*/}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
