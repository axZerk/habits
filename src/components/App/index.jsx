import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import AppBar from '../AppBar';
import routerConfig, { routes } from '../../routing';
import { AuthContext } from '../../context';
import { initAuthStateListener } from '../../firebase';

const initialState = {
  email: null,
  displayName: null,
  isLoading: false,
  userId: null,
  isAuth: false,
};

export default class App extends Component {
  state = { ...initialState };

  componentDidMount() {
    initAuthStateListener({
      onSignIn: this.handleLogin,
      onSignOut: this.handleLogout,
    });
  }

  handleLogin = user =>
    this.setState({
      isLoading: false,
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      isAuth: true,
    });

  handleLogout = () => this.setState({ ...initialState });

  render() {
    const { isAuth } = this.state;

    return (
      <AuthContext.Provider value={{ ...this.state }}>
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
