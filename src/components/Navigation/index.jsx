import React from 'react';
import NavItems from './NavItems';
import { routes } from 'routes';
import styles from './styles.css';

const navLinks = {
  public: [
    { path: routes.login, text: 'Log In' }
  ],
  private: [
    { path: routes.habits, text: 'Habits' },
    { path: routes.profile, text: 'Profile' },
    { path: routes.logout, text: ' Log Out' },
  ],
};

const Navigation = ({ isAuthenticated }) => (
  <ul className={styles.nav}>
    {isAuthenticated
      ? <NavItems items={navLinks.private} />
      : <NavItems items={navLinks.public} />
    }
  </ul>
);

export default Navigation;
