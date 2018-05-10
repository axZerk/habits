/* eslint-disable */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../shared/Icon';
import ICONS from '../../../../constants/icons';
import styles from './styles.css';

const CategoriesItem = ({ category, name, onClick, activeCategory }) => {
  const active = activeCategory === category;
  const cls = `${styles.label} ${active ? styles.active : ''}`;
  const color = active ? '#2196F3' : '#212121';

  return (
    <Fragment>
      <input
        className={styles.radio}
        type="radio"
        name="category"
        id={category}
        value={category}
      />
      <label
        htmlFor={category}
        className={cls}
        onClick={() => onClick(category)}>
        <span className={styles.icon}>
          <Icon icon={ICONS.home} size={50} color={color} />
        </span>
        <span className={styles.span}>{name}</span>
      </label>
    </Fragment>
  );
};

CategoriesItem.propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
};

export default CategoriesItem;
