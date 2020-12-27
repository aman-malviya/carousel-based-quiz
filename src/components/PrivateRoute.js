import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const isLogged = useContext(AuthContext);
  console.log(`ISSSSSSSs ${isLogged}`);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLogged ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to="/admin-login" />
        )
      }
    />
  );
};

export default PrivateRoute;
