import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import categories from './categories';
import styles from './styles.css';

// TODO: HabitsCoutner привести в порядок
const HabitsCategories = ({ match, location }) => {
  const { category } = queryString.parse(location.search);

  const getClassNames = name =>
    `${styles.link} ${name === category && styles.active}`;

  return (
    <ul className={styles.list}>
      {categories.map(({ name, text }) => (
        <li key={name} className={styles.item}>
          <Link
            to={{
              pathname: `${match.url}`,
              search: `?category=${name}`,
            }}
            className={getClassNames(name)}>
            # {text}
          </Link>
          {/* <span className={styles.counter}>{habitsCounter[name]}</span> */}
        </li>
      ))}
    </ul>
  );
};

HabitsCategories.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
  // habitsCounter,
};

export default withRouter(HabitsCategories);
