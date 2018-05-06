import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import withAuthContext from '../../hoc/withAuthContext';
import { routes } from '../../routing';
import { signOut } from '../../firebase';

class LogoutPage extends Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { isAuth } = this.props;

    if (isAuth) {
      signOut();
    }
  }

  render() {
    return <Redirect to={routes.login} />;
  }
}

export default withAuthContext(LogoutPage);
