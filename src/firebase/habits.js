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
      // TODO: это что такое?
      // .then(() => {
      //   habitsDbRef.child(`${userId}/habitsCounter`).once('value', snap => {
      //     console.log(snap);
      //     const counter = snap.val();
      //     const categoryCount = counter[habit.category];

      //     habitsDbRef.child(`${userId}/habitsCounter`).set({
      //       ...counter,
      //       [habit.category]: categoryCount + 1,
      //     });
      //   });
      // })
      .catch(throwError)
  );
};

export const deleteHabit = (userId, category, habitId) =>
  habitsDbRef
    .child(`${userId}/${category}/${habitId}`)
    .remove()
    .then(
      () => {},
      // TODO: магия
      // habitsDbRef.child(`${userId}/habitsCounter`).once('value', snap => {
      //   const counter = snap.val();
      //   const categoryCount = counter[category];

      //   if (categoryCount > 0) {
      //     habitsDbRef.child(`userId/habitsCounter`).set({
      //       ...counter,
      //       [category]: categoryCount - 1,
      //     });
      //   }
      // }),
    )
    .catch(throwError);

export const updateHabit = (userId, category, habitId, updatedData) =>
  habitsDbRef.child(`${userId}/${category}/${habitId}`).update(updatedData);

export const getHabitsByCategory = (userId, category, callback) => {
  habitsDbRef.child(`${userId}/${category}`).once('value', callback);

  // TODO: разобраться что это
  // habitsDbRef.child(`${userId}/habitsCounter`).once('value', snap => {
  //   const value = snap.val();

  //   if (value) {
  //     this.setState({ habitsCounter: value });
  //   } else {
  // this.createHabitsCounter();
  //   }
  // });
};

export const onChildAddedListener = (userId, category, callback) =>
  habitsDbRef
    .child(`${userId}/${category}`)
    .orderByKey()
    .limitToLast(1)
    .on('child_added', callback);

export const onChildRemovedListener = (userId, category, callback) =>
  habitsDbRef.child(`${userId}/${category}`).on('child_removed', callback);

export const getAllAndJoin = userId =>
  habitsDbRef.child(userId).once('value', snap => snap.val());
