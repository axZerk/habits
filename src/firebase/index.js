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
  getDataByCategory,
  getAllAndJoin,
} from './habits';
