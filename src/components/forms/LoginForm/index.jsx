import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';

export default class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    data: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {},
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
      errors.password = "Can't ba blank";
    }

    if (!Validator.isEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    return errors;
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

  render() {
    const { email, password } = this.state.data;

    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={email}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Make it secure"
              value={password}
              onChange={this.handleChange}
            />
          </li>
        </ul>
        <button>Login</button>
      </form>
    );
  }
}
