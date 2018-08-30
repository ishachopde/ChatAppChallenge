import * as React from "react";
import { Route, Redirect } from "react-router-dom";
export const PrivateRoute = ({ component: Component, ...rest }) => {

    // Add your own authentication on the below line.
    const user = localStorage.getItem("user");
    return (
      <Route
        {...rest}
        render={(props) =>
            user ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
          )
        }
      />
    );
  };
