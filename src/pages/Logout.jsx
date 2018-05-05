import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import withAuthContext from 'hoc/withAuthContext';
import { routes } from 'routing';

class Logout extends Component {
  componentDidMount() {
    const { isAuth, onLogout } = this.props;

    if (isAuth) {
      onLogout();
    }
  }

  render() {
    return <Redirect to={routes.login} />;
  }
}

export default withAuthContext(Logout);
