import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import Button from '../../shared/Button';
import styles from './styles.css';

export default class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    data: {
      email: '',
      password: '',
    },
    errors: {},
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
      },
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const errors = this.validate(this.state.data);

    this.setState({ errors }, () => {
      if (Object.keys(errors).length === 0) {
        this.props.onSubmit(this.state.data);
      }
    });
  };

  validate = data => {
    const errors = {};

    if (!data.password) {
      errors.password = 'This is not a valid password';
    }

    if (!Validator.isEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    return errors;
  };

  render() {
    const {
      data: { email, password },
    } = this.state;

    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder="example@example.com"
              value={email}
              onChange={this.handleChange}
            />
          </li>
          <li className={styles.item}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              placeholder="Make it secure"
              value={password}
              onChange={this.handleChange}
            />
          </li>
        </ul>
        <Button type="submit" text="Войти" primary />
      </form>
    );
  }
}
