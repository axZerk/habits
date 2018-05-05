import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  redirectTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => isAuthenticated
        ? <Component {...props} />
        : <Redirect from={props.location.pathname} to={redirectTo} />}
  />
);

export default PrivateRoute;
