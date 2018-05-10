import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Categories from './Categories';
import DaysList from './DaysList';
import Icon from '../shared/Icon';
import ICONS from '../../constants/icons';
import Button from '../shared/Button';
import withAuthContext from '../../hoc/withAuthContext';
import { addHabit } from '../../firebase';
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

class HabitEditor extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
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
    isModalVisible: false,
  };

  // TODO: порефакторить эту магию чуть-чуть
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
        break;
    }

    this.setState({ customDays: selectDays, duration: prevDuration });
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
    const { userId } = this.props;

    const habit = {
      title,
      category,
      startDate,
      duration,
    };

    addHabit(userId, habit)
      .then(() => this.setState({ ...initialState }))
      .then(this.handleCloseModal);
  };

  handleOpenModal = () => this.setState({ isModalVisible: true });
  handleCloseModal = () => this.setState({ isModalVisible: false });

  render() {
    const {
      isModalVisible,
      category,
      datePickerStartDate,
      customDays,
    } = this.state;

    return (
      <div className={styles.container}>
        <Button
          onClick={this.handleOpenModal}
          text="Добавить привычку"
          primary
        />

        <ReactModal
          isOpen={isModalVisible}
          contentLabel="onRequestClose Example"
          shouldCloseOnOverlayClick={false}
          className={styles.modal}
          overlayClassName={styles.overlay}>
          <button className={styles.btnClose} onClick={this.handleCloseModal}>
            <Icon icon={ICONS.close} size={40} />
          </button>

          {/* TODO: вынести форму в отдельный компонент */}
          <form className={styles.form} noValidate onSubmit={this.handleSubmit}>
            <h4 className={styles.header}>Новая привычка</h4>

            <input
              className={styles.input}
              placeholder="Описание"
              required
              onChange={this.handleTitleChange}
            />
            <Categories
              activeCategory={category}
              onClick={this.handleCategoryChange}
            />
            <label className={styles.label} htmlFor="start_day">
              Начало привычки
              <DatePicker
                selected={datePickerStartDate}
                onChange={this.handleStartDateChange}
                locale="en-gb"
                placeholderText="Weeks start on Monday"
                name="start_day"
              />
            </label>
            {/* TODO: что это за DaysList и что делает customdays */}
            {customDays && <DaysList selectDay={this.selectDay} />}
            <Button type="submit" text="Создать" primary />
          </form>
        </ReactModal>
      </div>
    );
  }
}

export default withAuthContext(HabitEditor);
