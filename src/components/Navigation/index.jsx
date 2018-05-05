import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
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
      <Link to={routes.login}>Log In</Link>
    </li>
  </Fragment>
);

const PrivateLinks = () => (
  <Fragment>
    <li>
      <Link to={routes.habits}>Habits</Link>
    </li>
    <li>
      <Link to={routes.profile}>Profile</Link>
    </li>
    <li>
      <Link to="/">Log Out</Link>
    </li>
  </Fragment>
);

const Navigation = ({ isAuthenticated, onSignOut }) => (
  <ul className={styles.nav}>
    {isAuthenticated ? <PrivateLinks /> : <PublicLinks />}
  </ul>
);

export default Navigation;
