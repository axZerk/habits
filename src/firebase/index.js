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
  onChildAddedListener,
  onChildRemovedListener,
  getAllAndJoin,
  removeHabitsListener,
} from './habits';
