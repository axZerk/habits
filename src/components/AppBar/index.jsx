import React from 'react';
import Navigation from '../Navigation';
import { AuthContext } from 'context';
import styles from './styles.css';

const AppBar = () => (
  <AuthContext.Consumer>
    {context => (
      <header className={styles.header}>
        <Navigation {...context} />
      </header>
    )}
  </AuthContext.Consumer>
);

export default AppBar;
