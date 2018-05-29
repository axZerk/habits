import React from 'react';
import Navigation from '../Navigation';
import styles from './styles.css';

const AppBar = () => (
  <header className={styles.header}>
    <nav className={styles.container}>
      <Navigation />
    </nav>
  </header>
);

export default AppBar;
