import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { routes } from 'routes';

export default class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to={routes.login} />;
  }
}
