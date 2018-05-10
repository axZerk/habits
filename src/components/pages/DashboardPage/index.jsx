import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import DashboardSidebar from '../../DashboardSidebar';
import HabitsList from '../../HabitsList';
import HabitEditor from '../../HabitEditor';
import withAuthContext from '../../../hoc/withAuthContext';
import {
  getHabitsByCategory,
  onChildAddedListener,
  onChildRemovedListener,
  removeHabitsListener,
} from '../../../firebase';
import styles from './styles.css';

class DashboardPage extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const params = queryString.parse(nextProps.location.search);
    // TODO: можно в метод вынести составление категорий и проверку
    const { category: nextCategory } = params;
    const { category: prevCategory } = prevState;
    const isCategoryUpdated = nextCategory !== prevCategory;

    const category = isCategoryUpdated ? nextCategory : prevCategory;

    return { category };
  }

  state = {
    habits: {},
    category: '',
  };

  componentDidMount() {
    const { userId, location } = this.props;
    const { category } = queryString.parse(location.search);

    if (category) {
      console.log('[CDM]: setting listeners for: ', category);
      getHabitsByCategory(userId, category, this.onGetHabits);
      onChildAddedListener(userId, category, this.onHabitAdded);
      onChildRemovedListener(userId, category, this.onHabitRemoved);
    }
  }

  // TODO: показать и рассказать зачем это нужно и почему это классно
  // подумать как не вешать слушателя при изменении параметра,
  // сделать универсального
  componentDidUpdate(prevProps, prevState) {
    const { userId } = this.props;
    const { category: nextCategory } = this.state;
    const { category: prevCategory } = prevState;
    const isCategoryUpdated = nextCategory !== prevCategory;

    if (isCategoryUpdated) {
      if (prevCategory !== '') {
        console.log('[CDU]: removing listeners from:', prevCategory);
        removeHabitsListener(userId, prevCategory);
      }

      console.log('[CDU]: setting listeners for: ', nextCategory);
      getHabitsByCategory(userId, nextCategory, this.onGetHabits);
      onChildAddedListener(userId, nextCategory, this.onHabitAdded);
      onChildRemovedListener(userId, nextCategory, this.onHabitRemoved);
    }
  }

  onHabitAdded = (value, key) =>
    this.setState(prevState => ({
      habits: { ...prevState.habits, [key]: value },
    }));

  onHabitRemoved = (value, key) =>
    this.setState(prevState => {
      const { [key]: _, ...habits } = prevState.habits;
      return { habits };
    });

  onGetHabits = value => this.setState({ habits: value });

  render() {
    const { habits } = this.state;

    return (
      <div className={styles.container}>
        {/* TODO: когда сделаются счетчики то надо будет
           композиция для HabitsCtegories */}
        <div className={styles.sidebar}>
          <HabitEditor />
          <DashboardSidebar title="Привычки" />
        </div>
        <div className={styles.content}>
          <HabitsList items={habits} />
        </div>
      </div>
    );
  }
}

export default withAuthContext(DashboardPage);
