import React from 'react';
import PropTypes from 'prop-types';
import HabitsListItem from '../HabitsListItem';
// import Habit from '../Habit';
// import DateField from '../DateField';
// import { deleteHabitData } from '../../firebase';
import styles from './styles.css';

// TODO: доделать сам habit
const HabitsList = ({ items }) => {
  const x = Object.values(items);

  return (
    <ul className={styles.list}>
      {x.map((item, idx) => (
        <li key={item.id}>
          <HabitsListItem
            index={idx}
            // onDelete={deleteHabitData}
            {...item}
          />
        </li>
      ))}
      {x.length === 0 && <p>В этой категории еще нет привычек</p>}
      {/* <DateField handleOpenModal={handleOpenModal} /> */}
    </ul>
  );
};

HabitsList.propTypes = {
  items: PropTypes.shape().isRequired,
};

export default HabitsList;
