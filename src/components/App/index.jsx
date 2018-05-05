import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import AppBar from 'components/AppBar';
import routerConfig from 'routes';
import { AuthContext } from 'context';

export default class App extends Component {
  state = {
    email: null,
    displayName: null,
    isLoading: false,
    userId: null,
    isAuthenticated: false,
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <AuthContext.Provider value={{ ...this.state }}>
        <AppBar />
        <Switch>
          {routerConfig.map(route => (
            <PrivateRoute
              key={route.path}
              path={route.path}
              component={route.component}
              isAuthenticated={
                route.protected ? isAuthenticated : !isAuthenticated
              }
              redirectTo={route.redirectPath}
            />
          ))}
        </Switch>
      </AuthContext.Provider>
    );
  }
}
