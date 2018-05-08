import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const CreateHabitBtn = ({ onClick }) => (
  <button onClick={onClick} className={styles.button}>
    Добавить привычку
  </button>
);

CreateHabitBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CreateHabitBtn;
