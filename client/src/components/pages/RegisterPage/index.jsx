import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import RegisterForm from '../../forms/RegisterForm';
import withAuthContext from '../../../hoc/withAuthContext';
import { routes } from '../../../routing';
import { createUserWithEmailAndPassword } from '../../../firebase';
import styles from './styles.css';

class RegisterPage extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape.isRequired,
    }).isRequired,
    isAuth: PropTypes.bool.isRequired,
  };

  state = {
    redirectToReferrer: false,
  };

  handleRegistration = credentials => {
    createUserWithEmailAndPassword(credentials).then(
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
        <div className={styles.container}>
          <RegisterForm onSubmit={this.handleRegistration} />
          <p className={styles.link}>
            <span>Уже есть аккаунт?</span>
            <br />
            <Link to={routes.login}>Войти</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withAuthContext(RegisterPage);
