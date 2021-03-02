import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import UserContext from "../contexts/UserContext";

const PublicRoute = ({ component: Component, ...rest }) => {
    const [authToken] = useContext(UserContext);
    console.log(authToken)
    return (
        <Route
            {...rest}
            render={(props) => {
                return authToken ? <Redirect to="/home/dashboard" /> : <Component {...props} {...rest} />
            }}
        />
    );
};

export default PublicRoute;
