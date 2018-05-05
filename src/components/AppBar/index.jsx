import React from 'react';
import Navigation from '../Navigation';
import styles from './styles.css';

const AppBar = () => (
  <header className={styles.header}>
    <Navigation />
  </header>
);

export default AppBar;
