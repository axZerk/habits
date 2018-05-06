import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import LoginForm from '../forms/LoginForm';
import withAuthContext from '../../hoc/withAuthContext';
import { routes } from '../../routing';

class LoginPage extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    location: PropTypes.shape.isRequired,
    isAuth: PropTypes.bool.isRequired,
  };

  state = {
    redirectToReferrer: false,
  };

  handleLogin = credentials => {
    this.props.onLogin(credentials);
    this.setState({ redirectToReferrer: true });
  };

  render() {
    const { redirectToReferrer } = this.state;
    // TODO: причесать получение пути
    const { from } = this.props.location.state || {
      from: { pathname: routes.dashboard },
    };

    // TODO: причесать перенаправление на страницу с которой пришли
    // и когда уже залогинен
    if (redirectToReferrer || this.props.isAuth) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <h1>Login Page</h1>
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}

export default withAuthContext(LoginPage);
