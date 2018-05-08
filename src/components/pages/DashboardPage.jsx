import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Sidebar from '../DashboardSidebar';
import HabitsCategories from '../HabitsCategories';
import HabitsList from '../HabitsList';
import CreateHabitBtn from '../CreateHabitBtn';
import CreateHabitModal from '../CreateHabitModal';
import withAuthContext from '../../hoc/withAuthContext';
import { habitsDbRef } from '../../firebase';

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
    this.getHabits();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.getHabits();
      console.log('oh mah god');
    }
  }

  getHabits = () => {
    this.getHabitsByCategory();
    this.initChildAddedListener();
    this.initChildRemovedListener();
  };

  // TODO: везде убрать family по умолчанию и завязать на параметры query-string
  // TODO: перенести в firebase, походу когда что угодно делаем тянет
  // Раньше было initOnceOnValueListener
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

      console.log(value);

      if (value) {
        this.setState({ habits: value });
      } else {
        this.setState({ habits: {} });
      }
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

        if (value) {
          this.setState(prevState => ({
            habits: {
              ...prevState.habits,
              [snap.key]: value,
            },
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
        if (value) {
          this.setState(prevState => {
            const { [snap.key]: _, ...rest } = prevState.habits;

            return {
              habits: rest,
            };
          });
        }
      });
  };

  handleOpenModal = () => this.setState({ showModal: true });
  handleCloseModal = () => this.setState({ showModal: false });

  render() {
    const { showModal, habits } = this.state;

    console.log(this.props.location.search);

    return (
      <div>
        <Sidebar>
          <HabitsCategories />
        </Sidebar>
        <HabitsList items={habits} />
        <CreateHabitBtn onClick={this.handleOpenModal} />
        {showModal && (
          <CreateHabitModal
            onCloseModal={this.handleCloseModal}
            showModal={showModal}
          />
        )}
      </div>
    );
  }
}

export default withAuthContext(DashboardPage);
