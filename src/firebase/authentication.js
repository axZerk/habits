import { auth } from './config';

/**
 * Create a user in database
 *
 * @param {Object} user
 */
// const createUserInDb = () => {};

/**
 * Create new user on firebase
 *
 * @param {Object} { email, password }
 */
export const createUserWithEmailAndPassword = ({ email, password, name }) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(user => user.updateProfile({ displayName: name, id: user.uid }))
    // TODO: сделать добавление пользователя в БД
    // .then(user => {
    //   const userRef = usersDbRef.child(`${user.uid}`);

    //   userRef
    //     .set({ name, email })
    //     .catch(error => this.setState({ error: error.message }));
    // })
    .catch(error => console.error(error));

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
export const signOut = () =>
  auth.signOut().catch(error => console.error(error));

/**
 * Start authentication listening process
 *
 * @param {Object} { onSignIn, onSignOut }
 */
export const initAuthStateListener = ({ onSignIn, onSignOut }) =>
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('[AUTH] => user logged in!');
      onSignIn(user);
    } else {
      console.log('[AUTH] => user logged out!');
      onSignOut();
    }
  });
