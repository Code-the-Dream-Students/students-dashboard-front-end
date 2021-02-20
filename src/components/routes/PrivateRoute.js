import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import UserContext from "../contexts/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [authToken, setAuthToken] = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={(props) => {
                return authToken ? <Component {...props} {...rest} /> : <Redirect to="/" />
            }}
        />
    );
};

export default PrivateRoute;
