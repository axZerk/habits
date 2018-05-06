import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import withAuthContext from 'hoc/withAuthContext';
import { routes } from 'routing';

class LoginPage extends Component {
  state = {
    redirectToReferrer: false,
  };

  handleLogin = evt => {
    evt.preventDefault();
    this.props.onLogin();
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
        <button onClick={this.handleLogin}>Log In</button>
      </div>
    );
  }
}

export default withAuthContext(LoginPage);
