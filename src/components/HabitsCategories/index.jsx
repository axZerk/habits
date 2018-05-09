import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import categories from './categories';
import styles from './styles.css';

// TODO: HabitsCoutner привести в порядок
const HabitsCategories = ({ match }) => (
  <ul className={styles.category__wrapper}>
    {categories.map(({ name, text }) => (
      <li key={name} className={styles.category__item}>
        <NavLink
          to={{
            pathname: `${match.url}`,
            search: `?category=${name}`,
          }}>
          # {text}
        </NavLink>
        {/* <span className={styles.counter}>{habitsCounter[name]}</span> */}
      </li>
    ))}
  </ul>
);

HabitsCategories.propTypes = {
  match: PropTypes.shape().isRequired,
  // habitsCounter,
};

export default withRouter(HabitsCategories);
