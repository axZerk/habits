import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.css';

const NavItems = ({ items }) => (
  <Fragment>
    {items.map(({ path, text }) => (
      <li key={path}>
        <NavLink
          className={styles.link}
          activeClassName={styles.active}
          to={path}>
          {text}
        </NavLink>
      </li>
    ))}
  </Fragment>
);

export default NavItems;
