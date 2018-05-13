import { auth, usersDbRef } from './config';
import { createHabitsCounter } from './habits';

const throwError = error => {
  throw new Error(`Error: ${error}`);
};

/**
 * Create new user on firebase
 *
 * @param {Object} { email, password, name }
 */
export const createUserWithEmailAndPassword = ({ email, password, name }) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      user.updateProfile({ displayName: name, id: user.uid });

      usersDbRef.child(`${user.uid}`).set({ id: user.uid, email, name });

      createHabitsCounter(user.uid);
    })
    .catch(throwError);

/**
 * Sign in existing user
 *
 * @param {Object} { email, password }
 */
export const signInWithEmailAndPassword = ({ email, password }) =>
  auth.signInWithEmailAndPassword(email, password).catch(throwError);

/**
 * Sign user out
 *
 */
export const signOut = () => auth.signOut().catch(throwError);

/**
 * Start authentication listening process
 *
 * @param {Object} { onSignIn, onSignOut }
 */
export const initAuthStateListener = ({ onSignIn, onSignOut }) =>
  auth.onAuthStateChanged(user => {
    if (user) {
      onSignIn(user);
    } else {
      onSignOut();
    }
  });
