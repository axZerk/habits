import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
// import { Ava } from '../Avatar';
import styles from './styles.css';

// const SignOutButton = ({ onSignOut }) => (
//   <button className={styles.btnLogout} type="button" onClick={onSignOut}>
//     Log Out
//   </button>
// );

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

const Navigation = ({ isAuth, onSignOut }) => (
  <ul className={styles.nav}>{isAuth ? <PrivateLinks /> : <PublicLinks />}</ul>
);

// const Navigation = () => (
//   <HabitContext.Consumer>
//     {({ isAuth, onSignOut }) =>
//       isAuth ? <NavigationAuth onSignOut={onSignOut} /> : <NavigationNonAuth />
//     }
//   </HabitContext.Consumer>
// );

export default Navigation;
