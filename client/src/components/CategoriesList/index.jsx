import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import qs from 'qs';
import Icon from '../shared/Icon';
import ICONS from '../../constants/icons';
import categories from '../../constants/habits-categories';
import styles from './styles.css';

const CategoriesList = ({ match, location, counter }) => {
  const { category } = qs.parse(location.search.slice(1));

  const getClassNames = name =>
    `${styles.link} ${name === category ? styles.active : ''}`;

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
            <span className={styles.icon}>
              {name === category && (
                <Icon icon={ICONS.arrow_forward} size={16} color="#2196f3" />
              )}
            </span>
            {text}
          </Link>
          <span className={styles.counter}>{counter[name]}</span>
        </li>
      ))}
    </ul>
  );
};

CategoriesList.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
  counter: PropTypes.shape({
    family: PropTypes.number.isRequired,
    health: PropTypes.number.isRequired,
    self: PropTypes.number.isRequired,
    hobbies: PropTypes.number.isRequired,
    environment: PropTypes.number.isRequired,
    finance: PropTypes.number.isRequired,
    career: PropTypes.number.isRequired,
    voyage: PropTypes.number.isRequired,
  }).isRequired,
};

export default withRouter(CategoriesList);
