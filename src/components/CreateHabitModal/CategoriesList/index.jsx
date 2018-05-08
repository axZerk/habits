/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const CategoriesList = ({ items, onClick, activeCategory }) => (
  <ul className={styles.list}>
    {items.map(item => (
      <li key={item.id} className={styles.item}>
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

CategoriesList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
};

export default CategoriesList;
