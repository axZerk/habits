import { getAllAndJoin, habitsDbRef } from '../../firebase';

export default class Habits extends Component {

    onGetAllClick = () => {
    getAllAndJoin(this.state.userId).then(result => {
      const { habitsCounter: _, ...rest } = result.val();
      const today = new Date();

      const arr = Object.values(rest).reduce(
        (acc, el) => acc.concat(Object.values(el)),
        [],
      );

      const filteredHabitsList = arr.filter(
        habit =>
          habit.startDate <= today.setHours(0, 0, 0, 0) &&
          habit.duration[today.getDay()],
      );

      this.setState({
        habitsList: filteredHabitsList,
      });
    });
  };

  render() {}
}
