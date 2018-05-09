/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import categories from './categories';
import styles from './styles.css';

const Categories = ({ onClick, activeCategory }) => (
  <ul className={styles.list}>
    {categories.map(item => (
      <li key={item.category} className={styles.item}>
        <input
          className={styles.radio}
          type="radio"
          name="category"
          id={item.category}
          value={item.category}
        />
        <label
          htmlFor={item.category}
          className={`${styles.label} ${
            activeCategory === item.category ? styles.active : ''
          }`}
          onClick={() => onClick(item.category)}>
          <img
            src="https://image.flaticon.com/icons/svg/214/214309.svg"
            alt="img"
            width="40"
            height="40"
          />
          <span className={styles.span}>{item.name}</span>
        </label>
      </li>
    ))}
  </ul>
);

Categories.propTypes = {
  onClick: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
};

export default Categories;
