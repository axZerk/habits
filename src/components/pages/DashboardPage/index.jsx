import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import DashboardSidebar from '../../DashboardSidebar';
import HabitsList from '../../HabitsList';
import HabitEditor from '../../HabitEditor';
import withAuthContext from '../../../hoc/withAuthContext';
import {
  habitsDbRef,
  getHabitsByCategory,
  onChildAddedListener,
  onChildRemovedListener,
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
    const { category: nextC } = queryString.parse(nextProps.location.search);
    const prevC = prevState.category;
    const isCategoryUpdated = nextC !== prevC;

    return {
      category: isCategoryUpdated ? nextC : prevC,
    };
  }

  state = {
    showModal: false,
    habits: {},
    category: '',
  };

  componentDidMount() {
    const { userId } = this.props;
    const { category } = queryString.parse(this.props.location.search);

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

    if (nextCategory !== prevCategory) {
      if (prevCategory !== '') {
        console.log('[CDU]: removing listeners from:', prevCategory);
        habitsDbRef.child(`${userId}/${prevCategory}`).off();
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

  // TODO: перенести в HabitEditor
  handleOpenModal = () => this.setState({ showModal: true });
  handleCloseModal = () => this.setState({ showModal: false });

  render() {
    const { showModal, habits } = this.state;

    return (
      <div className={styles.page}>
        <div className={styles.container}>
          {/* TODO: когда сделаются счетчики то надо будет
           композиция для HabitsCtegories */}
          <DashboardSidebar title="Привычки" />
          <div className={styles.content}>
            <HabitEditor
              onOpen={this.handleOpenModal}
              onClose={this.handleCloseModal}
              isVisible={showModal}
            />
            <HabitsList items={habits} />
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthContext(DashboardPage);
