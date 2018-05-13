import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Sidebar from '../../Sidebar';
import HabitsList from '../../HabitsList';
import HabitEditor from '../../HabitEditor';
import CategoriesList from '../../CategoriesList';
import withAuthContext from '../../../hoc/withAuthContext';
import {
  getHabitsByCategory,
  onChildAddedListener,
  onChildRemovedListener,
  removeHabitsListener,
  onCounterUpdatedListener,
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
    habitsCounter: {
      family: 0,
      health: 0,
      self: 0,
      hobbies: 0,
      environment: 0,
      finance: 0,
      career: 0,
      voyage: 0,
    },
  };

  componentDidMount() {
    const { location, userId } = this.props;
    const { category } = queryString.parse(location.search);

    onCounterUpdatedListener(userId, this.onCounterUpdated);

    if (category) {
      console.log('[CDM]: setting listeners for: ', category);
      this.onChangeCategory(category);
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
      this.onChangeCategory(nextCategory);
    }
  }

  onChangeCategory = category => {
    const { userId } = this.props;

    getHabitsByCategory(userId, category, this.onGetHabits);
    onChildAddedListener(userId, category, this.onHabitAdded);
    onChildRemovedListener(userId, category, this.onHabitRemoved);
  };

  onCounterUpdated = counter => this.setState({ habitsCounter: counter });

  onHabitAdded = ({ value, key }) =>
    this.setState(prevState => ({
      habits: { ...prevState.habits, [key]: value },
    }));

  onHabitRemoved = key =>
    this.setState(prevState => {
      const { [key]: _, ...habits } = prevState.habits;
      return { habits };
    });

  onGetHabits = habits => this.setState({ habits });

  render() {
    const { habits, habitsCounter } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <HabitEditor />
          <Sidebar title="Категории">
            <CategoriesList counter={habitsCounter} />
          </Sidebar>
        </div>
        <div className={styles.content}>
          <HabitsList items={habits} />
        </div>
      </div>
    );
  }
}

export default withAuthContext(DashboardPage);
