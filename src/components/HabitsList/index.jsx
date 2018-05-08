import React from 'react';
import PropTypes from 'prop-types';
// import { HabitContext } from '../App';
// import Habit from '../Habit';
// import DateField from '../DateField';
// import { deleteHabitData } from '../../firebase';
import styles from './styles.css';

// TODO: доделать сам habit
const HabitsList = ({ items }) => (
  <ul className={styles.wrapper}>
    {Object.values(items).map(habit => (
      <li key={habit.key}>
        <p>{habit.title}</p>
      </li>
    ))}
    {/* <DateField handleOpenModal={handleOpenModal} /> */}
    {/* {Object.values(items).map((habit, idx) => {}

      )} */}
  </ul>
);

HabitsList.propTypes = {
  items: PropTypes.shape().isRequired,
};

export default HabitsList;
