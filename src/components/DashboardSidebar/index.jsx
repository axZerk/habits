import React from 'react';
import PropTypes from 'prop-types';
import HabitsCategories from '../HabitsCategories';
import styles from './styles.css';

const DashboardSidebar = ({ title }) => (
  <section className={styles.sidebar}>
    <h2 className={styles.title}>{title}</h2>
    <HabitsCategories />
  </section>
);

DashboardSidebar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DashboardSidebar;
