import React from 'react';
import Item from './Item';
import categories from './categories';
import styles from './styles.css';

const Categories = props => (
  <ul className={styles.list}>
    {categories.map(item => (
      <li key={item.category} className={styles.item}>
        <Item {...item} {...props} />
      </li>
    ))}
  </ul>
);

export default Categories;
