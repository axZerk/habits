import React, { Component } from 'react';
import Sidebar from '../DashboardSidebar';
import HabitsCategories from '../HabitsCategories';
import HabitsList from '../HabitsList';
import CreateHabitBtn from '../CreateHabitBtn';
import CreateHabitModal from '../CreateHabitModal';
import withAuthContext from '../../hoc/withAuthContext';

class DashboardPage extends Component {
  state = {
    showModal: false,
  };

  handleOpenModal = () => this.setState({ showModal: true });
  handleCloseModal = () => this.setState({ showModal: false });

  render() {
    const { showModal } = this.state;

    return (
      <div>
        <Sidebar>
          <HabitsCategories />
        </Sidebar>
        <HabitsList items={{}} />
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
