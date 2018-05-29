import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../shared/PrivateRoute';
import AppBar from '../AppBar';
import routerConfig, { routes } from '../../routing';
import { AuthContext } from '../../context';
import { initAuthStateListener } from '../../firebase';
import styles from './styles.css';

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
    const { public: publicRoutes, private: privateRoutes } = routerConfig;

    return (
      <AuthContext.Provider value={{ ...this.state }}>
        <div className={styles.app}>
          {isAuth && <AppBar />}

          <Switch>
            {publicRoutes.map(route => <Route key={route.path} {...route} />)}

            {privateRoutes.map(route => (
              <PrivateRoute
                key={route.path}
                isAuthenticated={isAuth}
                {...route}
              />
            ))}

            <Redirect to={routes.login} />
          </Switch>
        </div>
      </AuthContext.Provider>
    );
  }
}
