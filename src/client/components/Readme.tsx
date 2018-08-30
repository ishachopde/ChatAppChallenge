
/**
 * Component to display footer.
 * @author  Isha CHopde
 */
import * as React from "react";
import "../resources/styles/loginstyles.css";

export class Readme extends React.Component {
    public render() {
        return (
            <div className="jumbotron">
                <h2 className="display-4">Hello, welcome to my <strong>Support Chat Challenge</strong></h2>

                <div className="info">
                    <p><strong>Info!</strong> This Chat Application allow users to connect to the support agents. The app requires the Support Agent to come online first, then users can join in.</p>
                </div>

                <div className="warning">
                    <p><strong>Note!</strong> While registering for the first time please check "SUPPORT" checkbox to bring Support Agent Online.</p>
                </div>

                <div className="danger">
                    <p><strong>Warning!</strong> Always bring the Support Agent Online first</p>
                </div>
            </div>
        );
    }
}
