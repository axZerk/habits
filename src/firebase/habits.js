import { habitsDbRef } from './config';

const throwError = error => {
  throw new Error(`Error: ${error}`);
};

export const addHabit = (userId, habit) => {
  const id = habitsDbRef.child(`${userId}/${habit.category}`).push().key;
  const newHabit = { ...habit, id };

  return (
    habitsDbRef
      .child(`${userId}/${habit.category}/${id}`)
      .set(newHabit)
      // TODO: Походу при добавлении обновляется счетчик категории
      .then(() => {
        habitsDbRef.child(`${userId}/counter`).once('value', snap => {
          const counter = snap.val();
          const categoryCount = counter[habit.category];

          habitsDbRef.child(`${userId}/counter`).set({
            ...counter,
            [habit.category]: categoryCount + 1,
          });
        });
      })
      .catch(throwError)
  );
};

export const deleteHabit = (userId, category, habitId) =>
  habitsDbRef
    .child(`${userId}/${category}/${habitId}`)
    .remove()
    .then(() =>
      // TODO: Походу при удалении обновляется счетчик категории
      habitsDbRef.child(`${userId}/counter`).once('value', snap => {
        const counter = snap.val();
        const categoryCount = counter[category];

        if (categoryCount > 0) {
          habitsDbRef.child(`${userId}/counter`).set({
            ...counter,
            [category]: categoryCount - 1,
          });
        }
      }),
    )
    .catch(throwError);

export const updateHabit = (userId, category, habitId, updatedData) =>
  habitsDbRef.child(`${userId}/${category}/${habitId}`).update(updatedData);

// TODO: пока оставил магию на всякий случай
// export const getHabitsByCategory = (userId, category, callback) => {
//   const habitsPromise = habitsDbRef.child(`${userId}/${category}`).once('value');
//   const counterPromise = habitsDbRef.child(`${userId}/counter`).once('value');

//   Promise.all([habitsPromise, counterPromise])
//     .then(([habitsSnap, counterSnap]) => {
//       const habits = habitsSnap.val() || {};
//       const counter = counterSnap.val() || {};

//       return { habits, counter };
//     })
//     .then(callback)
//     .catch(throwError);
// };

export const getHabitsByCategory = (userId, category, callback) => {
  habitsDbRef.child(`${userId}/${category}`).once('value', snap => {
    const value = snap.val() || {};

    callback(value);
  });
};

export const removeHabitsListener = (userId, category) =>
  habitsDbRef.child(`${userId}/${category}`).off();

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

export const getAllAndJoin = userId =>
  habitsDbRef.child(userId).once('value', snap => snap.val());

export const createHabitsCounter = user => {
  habitsDbRef.child(`${user.uid}/counter`).set({
    family: 0,
    health: 0,
    self: 0,
    hobbies: 0,
    environment: 0,
    finance: 0,
    career: 0,
    voyage: 0,
  });
};

export const onCounterUpdatedListener = (userId, callback) =>
  habitsDbRef.child(`${userId}/counter`).on('value', snap => {
    const value = snap.val();

    if (value) {
      callback(value);
    }
  });
