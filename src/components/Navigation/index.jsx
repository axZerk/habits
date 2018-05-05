import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from 'routes';
import styles from './styles.css';

// import { Ava } from '../Avatar';
// const SignOutButton = ({ onSignOut }) => (
//   <button className={styles.btnLogout} type="button" onClick={onSignOut}>
//     Log Out
//   </button>
// );
// <NavigationAuth onSignOut={onSignOut} />

const PublicLinks = () => (
  <Fragment>
    <li>
      <NavLink
        className={styles.link}
        activeClassName={styles.active}
        to={routes.login}>
        Log In
      </NavLink>
    </li>
  </Fragment>
);

const PrivateLinks = () => (
  <Fragment>
    <li>
      <NavLink
        className={styles.link}
        activeClassName={styles.active}
        to={routes.habits}>
        Habits
      </NavLink>
    </li>
    <li>
      <NavLink
        className={styles.link}
        activeClassName={styles.active}
        to={routes.profile}>
        Profile
      </NavLink>
    </li>
    <li>
      <NavLink className={styles.link} activeClassName={styles.active} to="/">
        Log Out
      </NavLink>
    </li>
  </Fragment>
);

const Navigation = ({ isAuthenticated, onSignOut }) => (
  <ul className={styles.nav}>
    {isAuthenticated ? <PrivateLinks /> : <PublicLinks />}
  </ul>
);

export default Navigation;
