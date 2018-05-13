/* eslint-disable */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../shared/Icon';
import ICONS from '../../../../constants/icons';
import styles from './styles.css';

const CategoriesItem = ({ name, text, onClick, activeCategory }) => {
  const active = activeCategory === name;
  const cls = `${styles.label} ${active ? styles.active : ''}`;
  const color = active ? '#2196F3' : '#212121';

  return (
    <Fragment>
      <input
        className={styles.radio}
        type="radio"
        name="category"
        id={name}
        value={name}
      />
      <label htmlFor={name} className={cls} onClick={() => onClick(name)}>
        <span className={styles.icon}>
          <Icon icon={ICONS.home} size={50} color={color} />
        </span>
        <span className={styles.span}>{text}</span>
      </label>
    </Fragment>
  );
};

CategoriesItem.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
};

export default CategoriesItem;
