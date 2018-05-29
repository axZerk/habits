export { auth, habitsDbRef, usersDbRef } from './config';

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  initAuthStateListener,
} from './authentication';

export {
  addHabit,
  deleteHabit,
  updateHabit,
  getHabitsByCategory,
  createHabitsCounter,
  onChildAddedListener,
  onChildRemovedListener,
  onCounterUpdatedListener,
  removeHabitsListener,
  getAllAndJoin,
} from './habits';
