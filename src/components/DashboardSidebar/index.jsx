import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const DashboardSidebar = ({ title, children }) => (
  <section className={styles.sidebar}>
    <h2 className={styles.title}>{title}</h2>
    {children}
  </section>
);

DashboardSidebar.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default DashboardSidebar;
