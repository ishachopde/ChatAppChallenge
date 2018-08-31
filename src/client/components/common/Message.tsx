
/**
 * Component to display footer.
 * @author  Isha CHopde
 */
import * as React from "react";
import { Route, Redirect } from "react-router-dom";
export const Message = ({ message }) => {
    return (
        <div className="jumbotron">
            <p className="lead">{message}</p>
        </div>
    );
  };
