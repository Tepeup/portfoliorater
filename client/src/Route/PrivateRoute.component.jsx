import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  currentUser,
  logOut,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() =>
        currentUser ? (
          <Component {...currentUser} logOut={logOut} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
