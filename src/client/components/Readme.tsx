
/**
 * Component to display footer.
 * @author  Isha CHopde
 */
import * as React from "react";

export class Readme extends React.Component {
    public render() {
        return (
            <div>
                <br/>
                <br/>
                    This Chat Application allow users to connect to the support agents. Support can handle multi users at the same time with responsive UI.
                <br/>
                <br/>
                    <p> Built using React, Redux, Node, Express, Socket.io </p>
                <br/>
                <br/>
                <div className="danger">
                    <p><strong>Note!</strong> Please login as a support, before user. Support should be available
                    before it can be allocated.</p>
                </div>
            </div>
        );
    }
}
