import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from 'routing';
import styles from './styles.css';

const navLinks = [
  { path: routes.dashboard, text: 'Dashboard' },
  { path: routes.profile, text: 'Profile' },
  { path: routes.logout, text: ' Log Out' },
];

const Navigation = () => (
  <ul className={styles.nav}>
    {navLinks.map(({ path, text }) => (
      <li key={path}>
        <NavLink
          className={styles.link}
          activeClassName={styles.active}
          to={path}>
          {text}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default Navigation;
