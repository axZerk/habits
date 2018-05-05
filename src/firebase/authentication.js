import { auth } from './firebase';

/**
 * Create new user on firebase
 *
 * @param {Object} { email, password }
 */
const createUserWithEmailAndPassword = ({ email, password }) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .catch(err => console.error(error));

/**
 * Sign in existing user
 *
 * @param {Object} { email, password }
 */
export const signInWithEmailAndPassword = ({ email, password }) =>
  auth
    .signInWithEmailAndPassword(email, password)
    .catch(error => console.error(error));

/**
 * Sign user out
 *
 */
const signOut = () => auth.signOut().catch(error => console.error(error));

/**
 * Start authentication listening process
 *
 * @param {Object} { onSignIn, onSignOut }
 */
const initAuthStateListener = ({ onSignIn, onSignOut }) =>
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('[AUTH] => user logged in!');
      onSignIn(user);
    } else {
      console.log('[AUTH] => user logged out!');
      // FIXME: Не уверен что тут нужны эти вызовы
      doSignOut().then(() => onSignOut());
    }
  });
