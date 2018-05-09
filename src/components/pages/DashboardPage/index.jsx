import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import DashboardSidebar from '../../DashboardSidebar';
import HabitsList from '../../HabitsList';
import HabitEditor from '../../HabitEditor';
import withAuthContext from '../../../hoc/withAuthContext';
import { habitsDbRef } from '../../../firebase';
import styles from './styles.css';

class DashboardPage extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    showModal: false,
    habits: {},
  };

  componentDidMount() {
    this.getHabitsByCategory();
    this.initChildAddedListener();
    this.initChildRemovedListener();
  }

  // TODO: показать и рассказать зачем это нужно и почему это классно
  // подумать как не вешать слушателя при изменении параметра, сделать универсального
  componentDidUpdate(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.getHabitsByCategory();
      this.initChildAddedListener();
      this.initChildRemovedListener();
      console.log('oh mah god, we got habitz-z-z-z!');
    }
  }

  // TODO: везде убрать family по умолчанию и завязать на параметры query-string
  // TODO: перенести в firebase, походу когда что угодно делаем тянет
  // Раньше было initOnceOnValueListener
  // вместо callback можно метод компонента передавать и там все делать, хорошая идея!
  getHabitsByCategory = () => {
    const { userId, location } = this.props;
    const params = queryString.parse(location.search);

    // TODO: разобраться что это
    habitsDbRef.child(`${userId}/habitsCounter`).once('value', snap => {
      const value = snap.val();

      if (value) {
        this.setState({ habitsCounter: value });
      } else {
        // this.createHabitsCounter();
      }
    });

    habitsDbRef.child(`${userId}/${params.category}`).once('value', snap => {
      const value = snap.val();

      this.setState({ habits: value || {} });
    });
  };

  // TODO: перенести в firebase, походу когда добавляет тянет
  initChildAddedListener = () => {
    const { userId, location } = this.props;
    const params = queryString.parse(location.search);

    habitsDbRef
      .child(`${userId}/${params.category}`)
      .orderByKey()
      .limitToLast(1)
      .on('child_added', snap => {
        const value = snap.val();
        const key = snap.key;

        if (value) {
          this.setState(prevState => ({
            habits: { ...prevState.habits, [key]: value },
          }));
        }
      });
  };

  // TODO: перенести в firebase, походу когда удаляет тянет
  initChildRemovedListener = () => {
    const { userId, location } = this.props;
    const params = queryString.parse(location.search);

    habitsDbRef
      .child(`${userId}/${params.category}`)
      .on('child_removed', snap => {
        const value = snap.val();
        const key = snap.key;

        if (value) {
          this.setState(prevState => {
            const { [key]: _, ...habits } = prevState.habits;

            return { habits };
          });
        }
      });
  };

  handleOpenModal = () => this.setState({ showModal: true });
  handleCloseModal = () => this.setState({ showModal: false });

  render() {
    const { showModal, habits } = this.state;

    return (
      <div className={styles.page}>
        <div className={styles.container}>
          {/* TODO: когда сделаются счетчики то надо будет композиция для HabitsCtegories */}
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
