import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';

// import Register from 'pages/Register';
// import Login from 'pages/Login';
// import Reset from 'pages/Reset';
// import Profile from 'pages/Profile';
// import Habits from 'pages/Habits';

import routes from 'routes';
// import Header from '../Header';

import styles from './styles.css';

class App extends Component {
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
              isAuthenticated={true}
              redirectTo={route.redirect}
            />
          ))}
        </Switch>
      </div>
    );
  }
}

export default App;

// {
/* <PrivateRoute
            path={routes.REGISTER}
            isAuthenticated={!isLoggedIn}
            component={Register}
            redirectTo={routes.HABITS}
          />
          <PrivateRoute
            path="/account/login"
            isAuthenticated={!isLoggedIn}
            component={Login}
            redirectTo="/"
          />
          <PrivateRoute
            path="/account/reset"
            isAuthenticated={!isLoggedIn}
            component={Reset}
            redirectTo="/"
          />
          <PrivateRoute
            path="/account/profile"
            isAuthenticated={isLoggedIn}
            component={Profile}
            redirectTo="/account/login"
          />
          <PrivateRoute
            exact
            path="/habits"
            isAuthenticated={isLoggedIn}
            component={Habits}
            redirectTo="/account/login"
          /> */
// }
