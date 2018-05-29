import { habitsDbRef } from './config';

const throwError = error => {
  throw new Error(`Error: ${error}`);
};

const updateHabitsCounter = ({ userId, category, operation }) => {
  habitsDbRef.child(`${userId}/counter`).once('value', snap => {
    const counter = snap.val();
    const count = counter[category];
    const value = operation === 'increment' ? count + 1 : count - 1;

    habitsDbRef.child(`${userId}/counter`).set({
      ...counter,
      [category]: value,
    });
  });
};

export const addHabit = (userId, habit) => {
  const id = habitsDbRef.child(`${userId}/${habit.category}`).push().key;
  const newHabit = { ...habit, id };
  const category = newHabit.category;

  return habitsDbRef
    .child(`${userId}/${habit.category}/${id}`)
    .set(newHabit)
    .then(() =>
      updateHabitsCounter({ userId, category, operation: 'increment' }),
    )
    .catch(throwError);
};

export const deleteHabit = (userId, category, habitId) =>
  habitsDbRef
    .child(`${userId}/${category}/${habitId}`)
    .remove()
    .then(() =>
      updateHabitsCounter({ userId, category, operation: 'decrement' }),
    )
    .catch(throwError);

export const getHabitsByCategory = (userId, category, callback) =>
  habitsDbRef.child(`${userId}/${category}`).once('value', snap => {
    const value = snap.val() || {};

    callback(value);
  });

export const onChildAddedListener = (userId, category, callback) =>
  habitsDbRef
    .child(`${userId}/${category}`)
    .orderByKey()
    .limitToLast(1)
    .on('child_added', snap => {
      const value = snap.val();
      const key = snap.key;

      if (value) {
        callback({ value, key });
      }
    });

export const onChildRemovedListener = (userId, category, callback) =>
  habitsDbRef.child(`${userId}/${category}`).on('child_removed', snap => {
    const value = snap.val();
    const key = snap.key;

    if (value) {
      callback(key);
    }
  });

export const removeHabitsListener = (userId, category) =>
  habitsDbRef.child(`${userId}/${category}`).off();

export const createHabitsCounter = userId =>
  habitsDbRef.child(`${userId}/counter`).set({
    family: 0,
    health: 0,
    self: 0,
    hobbies: 0,
    environment: 0,
    finance: 0,
    career: 0,
    voyage: 0,
  });

export const onCounterUpdatedListener = (userId, callback) =>
  habitsDbRef.child(`${userId}/counter`).on('value', snap => {
    const value = snap.val();

    if (value) {
      callback(value);
    }
  });

// TODO: вот это разобрать
export const getAllAndJoin = userId =>
  habitsDbRef.child(userId).once('value', snap => snap.val());

// TODO: пока болванка
export const updateHabit = (userId, category, habitId, updatedData) =>
  habitsDbRef.child(`${userId}/${category}/${habitId}`).update(updatedData);
