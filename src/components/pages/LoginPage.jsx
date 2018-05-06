import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import LoginForm from '../forms/LoginForm';
import withAuthContext from '../../hoc/withAuthContext';
import { routes } from '../../routing';
import { signInWithEmailAndPassword } from '../../firebase';

class LoginPage extends Component {
  static propTypes = {
    location: PropTypes.shape.isRequired,
    isAuth: PropTypes.bool.isRequired,
  };

  state = {
    redirectToReferrer: false,
  };

  handleLogin = credentials => {
    signInWithEmailAndPassword(credentials).then(
      this.setState({ redirectToReferrer: true }),
    );
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
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}

export default withAuthContext(LoginPage);
