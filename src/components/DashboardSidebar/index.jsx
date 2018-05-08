import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Sidebar = props => (
  <section className={styles.sidebar}>
    <h2 className={styles.title}>Привычки</h2>
    {props.children}
  </section>
);

Sidebar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Sidebar;
