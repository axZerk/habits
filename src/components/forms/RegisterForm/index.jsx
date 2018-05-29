import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import Button from '../../shared/Button';
import styles from './styles.css';

export default class RegisterForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    data: {
      email: '',
      password: '',
      name: '',
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
    const { password } = data;
    const passwordPattern = /\s+/;
    const checkPassword = !(
      passwordPattern.test(password) ||
      password.length < 5 ||
      password.length > 32
    );

    if (!checkPassword) {
      errors.password = 'This is not a valid password';
    }

    if (!Validator.isEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (!data.name) {
      errors.name = 'Enter your real name';
    }

    return errors;
  };

  render() {
    const {
      data: { email, password, name },
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className={styles.input}
              placeholder="Enter your profile name"
              value={name}
              onChange={this.handleChange}
            />
          </li>

          <li className={styles.item}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
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
              name="password"
              className={styles.input}
              placeholder="Make it secure"
              value={password}
              onChange={this.handleChange}
            />
          </li>
        </ul>
        <Button type="submit" text="Зарегистрироваться" primary />
      </form>
    );
  }
}
