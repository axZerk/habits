import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import routes from 'routes';

export default class App extends Component {
  state = {
    isLoggedIn: false,
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div>
        <Switch>
          {routes.map(route => (
            <PrivateRoute
              key={route.path}
              path={route.path}
              component={route.component}
              isAuthenticated={route.protected ? isLoggedIn : !isLoggedIn}
              redirectTo={route.redirectPath}
            />
          ))}
        </Switch>
      </div>
    );
  }
}
