import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Button = ({ type, text, primary, onClick }) => {
  const cls = `${styles.button} ${primary && styles.primary}`;

  return (
    <button type={type} className={cls} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  primary: true,
  onClick: () => {},
};

export default Button;
