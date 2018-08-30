/**
 * Component to display horizontal user list..
 * @author  Isha CHopde
 */

import * as React from "react";
import { history } from "../helpers";

export class HomePage extends React.Component<{}, {}> {
    public componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            history.push("/login");
            return;
        }
        if (user.isSupport) {
            history.push("/support");
        } else {
            history.push("/user");
        }
    }

    public render(): React.ReactNode {
        return (
            <div>
                Loading...
            </div>
        );
    }
}
