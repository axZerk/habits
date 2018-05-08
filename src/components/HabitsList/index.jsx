import React from 'react';
import PropTypes from 'prop-types';
// import { HabitContext } from '../App';
// import Habit from '../Habit';
// import DateField from '../DateField';
// import { deleteHabitData } from '../../firebase';
import styles from './styles.css';

const HabitsList = ({ items }) => {
  console.log('[HabitsList] items: ', items);

  return (
    <div className={styles.wrapper}>
      {/* <DateField handleOpenModal={handleOpenModal} /> */}
      {/* {Object.values(items).map((habit, idx) => {}

      )} */}
    </div>
  );
};

HabitsList.propTypes = {
  items: PropTypes.shape().isRequired,
};

export default HabitsList;
