import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import withAuthContext from 'hoc/withAuthContext';
import { routes } from 'routes';

class Logout extends Component {
  componentDidMount() {
    if (this.props.isAuth) {
      this.props.onLogout();
    }
  }

  render() {
    return <Redirect to={routes.login} />;
  }
}

export default withAuthContext(Logout);
