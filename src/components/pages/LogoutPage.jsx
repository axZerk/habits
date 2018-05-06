import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import withAuthContext from '../../hoc/withAuthContext';
import { routes } from '../../routing';

class LogoutPage extends Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
  };
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

export default withAuthContext(LogoutPage);
