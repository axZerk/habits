import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import withAuthContext from 'hoc/withAuthContext';

class Login extends Component {
  state = {
    redirectToReferrer: false,
  };

  handleLogin = () => {
    this.props.onLogin();

    this.setState({
      redirectToReferrer: true,
    });
  };

  render() {
    const { redirectToReferrer } = this.state;
    const { from } = this.props.location.state || {
      from: { pathname: '/habits' },
    };

    if (redirectToReferrer) {
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

export default withAuthContext(Login);
