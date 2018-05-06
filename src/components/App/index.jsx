import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import AppBar from '../AppBar';
import routerConfig, { routes } from '../../routing';
import { AuthContext } from '../../context';

export default class App extends Component {
  state = {
    email: null,
    displayName: null,
    isLoading: false,
    userId: null,
    isAuth: false,
  };

  handleLogin = () => {
    console.log('Logged In!');
    this.setState({ isAuth: true });
  };

  handleLogout = () => {
    this.setState({ isAuth: false });
  };

  render() {
    const { isAuth } = this.state;

    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          onLogin: this.handleLogin,
          onLogout: this.handleLogout,
        }}>
        {isAuth && <AppBar />}
        <Switch>
          {routerConfig.public.map(route => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
          {routerConfig.private.map(route => (
            <PrivateRoute
              key={route.path}
              path={route.path}
              component={route.component}
              isAuthenticated={isAuth}
              redirectTo={route.redirectPath}
            />
          ))}
          <Redirect to={routes.login} />
        </Switch>
      </AuthContext.Provider>
    );
  }
}
