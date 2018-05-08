import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import CategoriesList from './CategoriesList';
import DaysList from './DaysList';
import { auth, writeHabitData } from '../../firebase';
import categories from './categories';
import styles from './styles.css';

ReactModal.setAppElement('#root');

const initialState = {
  title: '',
  category: '',
  startDate: '',
  customDays: false,
  duration: {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '0': false,
  },
};

export default class CreateHabitModal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
  };

  state = {
    title: '',
    category: '',
    startDate: '',
    datePickerStartDate: moment(),
    datePickerStartTime: moment(),
    customDays: false,
    duration: {
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': false,
      '6': false,
      '0': false,
    },
  };

  getDuration = evt => {
    const prevDuration = { ...this.state.duration };
    let selectDays = false;

    // TODO: подумать над утилитой для записи стейта ключей
    switch (evt.target.value) {
      case 'workDays':
        Object.keys(prevDuration).forEach(key => {
          prevDuration[key] = !(key === '0' || key === '6');
        });
        break;

      case 'holydays':
        Object.keys(prevDuration).forEach(key => {
          prevDuration[key] = key === '0' || key === '6';
        });
        break;

      case 'everyday':
        Object.keys(prevDuration).forEach(key => {
          prevDuration[key] = true;
        });
        break;

      case 'customDays':
        Object.keys(prevDuration).forEach(key => {
          prevDuration[key] = false;
        });
        selectDays = true;
        break;

      default:
        console.log('default case');
        break;
    }

    this.setState({ customDays: selectDays, duration: prevDuration }, () =>
      console.log(this.state.duration),
    );
  };

  handleStartDateChange = date => {
    const start = date.format('LL');
    const startInMsec = Date.parse(start);
    this.setState({ datePickerStartDate: date, startDate: startInMsec });
  };

  handleTitleChange = evt => {
    const value = evt.target.value;
    this.setState({ title: value });
  };

  selectDay = day => {
    const dayId = day.slice(3);
    const currentDuration = this.state.duration;
    const keys = Object.keys(currentDuration);

    keys.forEach(key => {
      if (key === dayId) {
        currentDuration[key] = !currentDuration[key];
      }
    });

    this.setState({ duration: currentDuration });
  };

  handleCategoryChange = category => this.setState({ category });

  handleSubmit = evt => {
    evt.preventDefault();
    // FIXME: добавить нормальную валидацию
    // console.log('this.state: ', this.state);
    // if (!evt.target.checkValidity()) {
    //   console.log(`Not enoth data`);
    //   // form is invalid! so we do nothing
    //   return;
    // }

    const { title, category, startDate, duration } = this.state;

    // form is valid! We can parse and submit data
    const newHabit = {
      title,
      category,
      startDate,
      duration,
    };

    writeHabitData(auth.currentUser.uid, newHabit)
      .then(() => this.setState({ ...initialState }))
      .then(this.props.onCloseModal);
  };

  render() {
    const { showModal, onCloseModal } = this.props;

    return (
      <ReactModal
        isOpen={showModal}
        contentLabel="onRequestClose Example"
        shouldCloseOnOverlayClick={false}
        className={styles.modal}
        overlayClassName={styles.overlay}>
        <button className={styles.btnClose} onClick={onCloseModal}>
          &times;
        </button>
        <h4 className={styles.header}>Новая привычка</h4>

        <form className={styles.form} noValidate onSubmit={this.handleSubmit}>
          <input
            className={styles.input}
            placeholder="Название"
            required
            onChange={this.handleTitleChange}
          />
          <CategoriesList
            items={categories}
            activeCategory={this.state.category}
            onClick={this.handleCategoryChange}
          />
          <label className={styles.label} htmlFor="start_day">
            Начало привычки
            <DatePicker
              selected={this.state.datePickerStartDate}
              onChange={this.handleStartDateChange}
              locale="en-gb"
              placeholderText="Weeks start on Monday"
              name="start_day"
            />
          </label>
          {this.state.customDays && <DaysList selectDay={this.selectDay} />}
          <button type="submit" className={styles.btnSubmit}>
            Создать
          </button>
        </form>
      </ReactModal>
    );
  }
}
