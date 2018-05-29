import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import LoginForm from '../../forms/LoginForm';
import Loader from '../../shared/Loader';
import withAuthContext from '../../../hoc/withAuthContext';
import { routes } from '../../../routing';
import { signInWithEmailAndPassword } from '../../../firebase';
import styles from './styles.css';

class LoginPage extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape.isRequired,
    }).isRequired,
    isAuth: PropTypes.bool.isRequired,
  };

  state = {
    redirectToReferrer: false,
    isAuthenticating: false,
  };

  setAuthenticatedState = () =>
    this.setState({
      redirectToReferrer: true,
      isAuthenticating: false,
    });

  handleLogin = credentials => {
    this.setState({ isAuthenticating: true });

    signInWithEmailAndPassword(credentials).then(this.setAuthenticatedState);
  };

  render() {
    const { redirectToReferrer, isAuthenticating } = this.state;
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
      <div className={styles.page}>
        {isAuthenticating ? (
          <Loader width="80px" height="80px" />
        ) : (
          <div className={styles.container}>
            <LoginForm onSubmit={this.handleLogin} />
            <p className={styles.link}>
              <span>Еще нет аккаунта?</span>
              <br />
              <Link to={routes.register}>Зарегистрироваться</Link>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default withAuthContext(LoginPage);
