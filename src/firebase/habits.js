import { habitsDbRef } from './config';

export const writeHabitData = (userId, habit) => {
  const key = habitsDbRef.child(`${userId}/${habit.category}`).push().key;
  const newHabit = { ...habit, key };

  return habitsDbRef
    .child(`${userId}/${habit.category}/${key}`)
    .set(newHabit)
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
    .catch(err => console.log(err));
};

export const deleteHabitData = (userId, category, habitId) =>
  habitsDbRef
    .child(`${userId}/${habitId}`)
    .remove()
    .then(() =>
      habitsDbRef.child(`${userId}/habitsCounter`).once('value', snap => {
        const counter = snap.val();
        const categoryCount = counter[category];

        if (categoryCount > 0) {
          habitsDbRef.child(`userId/habitsCounter`).set({
            ...counter,
            [category]: categoryCount - 1,
          });
        }
      }),
    )
    .catch(err => console.log(err));

export const updateHabitData = (userId, category, habitId, updatedData) =>
  habitsDbRef.child(`${userId}/${category}/${habitId}`).update(updatedData);

export const getDataByCategory = (userId, category) =>
  habitsDbRef.child(`${userId}/${category}`).once('value', snap => snap.val());

export const getAllAndJoin = userId =>
  habitsDbRef.child(userId).once('value', snap => snap.val());
