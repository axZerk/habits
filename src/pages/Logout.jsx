import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { routes } from 'routes';

export default class Logout extends Component {
  componentDidMount() {
    // TODO: добавить логику логаута
    // this.props.onLogout();
  }

  render() {
    return <Redirect to={routes.login} />;
  }
}
