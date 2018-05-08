export { auth, habitsDbRef, usersDbRef } from './config';

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  initAuthStateListener,
} from './authentication';

export {
  writeHabitData,
  deleteHabitData,
  updateHabitData,
  getDataByCategory,
  getAllAndJoin,
} from './habits';
