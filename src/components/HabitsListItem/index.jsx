/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { calcDay } from '../DateField';
// import { habitsDbRef } from '../../firebase';
import styles from './styles.css';

export default class Habit extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    // duration, habitsDone
  };

  state = {
    habitWasDone: false,
    date: {},
    // date: {
    //   today: new Date(),
    //   yesterday: calcDay(new Date(), -1),
    //   beforeYesterday: calcDay(new Date(), -2),
    //   tomorrow: calcDay(new Date(), +1),
    //   afterTomorrow: calcDay(new Date(), +2),
    // },
  };

  componentDidMount() {
    // const { date } = this.state;
    // date.today.setHours(0, 0, 0, 0);
    // let habitsDone = this.props.habitsDone;
    // if (habitsDone) {
    //   this.setState({
    //     habitWasDone: habitsDone[date.today],
    //   });
    // }
  }

  onDeleteClick = () => {
    console.log('click click');
    // const target = evt.target;
    // const { id } = this.props;
    // const {
    //   onDelete,
    //   category ,
    // } = this.props;

    // onDelete(auth.currentUser.uid, category, category + '/' + id);
  };

  handleClick = () => {
    // const { key: id, category, duration, habitsDone } = this.props;
    // const { date, habitWasDone } = this.state;
    // if (duration && duration[date.today.getDay()]) {
    //   habitsDbRef
    //     .child(`${auth.currentUser.uid}/${category}/${id}/habitsDone`)
    //     .set({
    //       ...habitsDone,
    //       [date.today.setHours(0, 0, 0, 0)]: !habitWasDone,
    //     })
    //     .then(() => {
    //       this.setState(prevState => ({
    //         habitWasDone: !prevState.habitWasDone,
    //       }));
    //     });
    // }
  };

  handleIconStyle = checkedDate => {
    // const { duration, habitsDone, startDate } = this.props;

    // const { date } = this.state;

    // let iconStyle = [styles.sign];

    // const habitShouldDo =
    //   startDate <= Date.parse(checkedDate) &&
    //   duration &&
    //   duration[checkedDate.getDay()];

    // const habitWasMade =
    //   habitsDone && habitsDone[checkedDate.setHours(0, 0, 0, 0)];

    // if (habitShouldDo) {
    //   if (checkedDate < date.today.setHours(0, 0, 0, 0)) {
    //     iconStyle =
    //       habitShouldDo && habitWasMade
    //         ? [...iconStyle, styles.sign__done]
    //         : [...iconStyle, styles.sign__not_done];
    //   } else {
    //     if (
    //       checkedDate.setHours(0, 0, 0, 0) === date.today.setHours(0, 0, 0, 0)
    //     ) {
    //       iconStyle = this.state.habitWasDone
    //         ? [...iconStyle, styles.sign__done]
    //         : [...iconStyle, styles.sign__todo];
    //     } else {
    //       iconStyle = [...iconStyle, styles.sign__todo];
    //     }
    //   }
    // } else {
    //   iconStyle = [...iconStyle, styles.sign__none];
    // }

    // return iconStyle.join(' ');
    return '';
  };

  render() {
    const { index, title } = this.props;

    const {
      date: { today, beforeYesterday, yesterday, tomorrow, afterTomorrow },
    } = this.state;

    return (
      <div className={styles.item}>
        <span className={styles.index}>{index + 1}</span>
        <p className={styles.title}>{title}</p>
        <ul className={styles.list}>
          <li className={styles.list_item} />
          <li className={styles.list_item} />
          <li className={styles.list_item} />
          <li className={styles.list_item} />
          <li className={styles.list_item} />
        </ul>
        <button className={styles.button} onClick={this.onDeleteClick}>
          &times;
        </button>
      </div>
    );
  }
}
