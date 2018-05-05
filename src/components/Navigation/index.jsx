import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
// import * as routes from '../../constants/routes';
import { Ava } from '../Avatar';
import { HabitContext } from '../App';
import { HOME } from '../../constants/routes';
import styles from './styles.css';

// const SignOutButton = ({ onSignOut }) => (
//   <button className={styles.btnLogout} type="button" onClick={onSignOut}>
//     Log Out
//   </button>
// );

const publicLinks = () => (
  <li>
    <Link to={routes.SIGN_IN} />
  </li>
);

const privateLinks = () => (
  <li>
    <li>
      <Link to={HOME}>HOME</Link>
    </li>
    <li>
      <Link to={routes.ACCOUNT}>{/* <Ava /> */}</Link>
    </li>
    <li>
      <button>Log Out</button>
    </li>
  </li>
);

const Navigation = () => (
  <HabitContext.Consumer>
    {({ isAuth, onSignOut }) =>
      isAuth ? <NavigationAuth onSignOut={onSignOut} /> : <NavigationNonAuth />
    }
  </HabitContext.Consumer>
);

const NavigationAuth = ({ onSignOut }) => <ul className={styles.nav} />;

export default Navigation;
