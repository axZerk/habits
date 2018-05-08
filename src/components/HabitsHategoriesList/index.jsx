import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import categories from './categories';
import styles from './styles.css';

const HabitsHategoriesList = ({ match }) => (
  <ul className={styles.category__wrapper}>
    {categories.map(({ name, text }) => (
      <li key={name} className={styles.category__item}>
        <NavLink
          to={{
            pathname: `${match.url}`,
            search: `?category=${name}`,
          }}
          onClick={() => console.log('click')}>
          # {text}
        </NavLink>
        {/* <span className={styles.counter}>{habitsCounter[name]}</span> */}
      </li>
    ))}
  </ul>
);

HabitsHategoriesList.propTypes = {
  match: PropTypes.shape().isRequired,
  // habitsCounter,
};

export default withRouter(HabitsHategoriesList);
