import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
// import DateField from '../DateField';
import withAuthContext from '../../hoc/withAuthContext';
import { deleteHabit } from '../../firebase';
import styles from './styles.css';

// TODO: доделать сам habit
const HabitsList = ({ items, userId }) => {
  const values = Object.values(items);

  return (
    <ul className={styles.list}>
      {values.map((item, idx) => (
        <li key={item.id}>
          <Item userId={userId} index={idx} onDelete={deleteHabit} {...item} />
        </li>
      ))}
      {values.length === 0 && <p>В этой категории еще нет привычек</p>}
      {/* <DateField handleOpenModal={handleOpenModal} /> */}
    </ul>
  );
};

HabitsList.propTypes = {
  items: PropTypes.shape().isRequired,
  userId: PropTypes.string.isRequired,
};

export default withAuthContext(HabitsList);
