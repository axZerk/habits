import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBHCosX1CHJh6VD5sFPfsuUhhYItxwmI5Q',
  authDomain: 'habits-43acf.firebaseapp.com',
  databaseURL: 'https://habits-43acf.firebaseio.com',
  projectId: 'habits-43acf',
  storageBucket: 'habits-43acf.appspot.com',
  messagingSenderId: '895756855644',
};

firebase.initializeApp(config);

export default firebase;

export const auth = firebase.auth();
export const db = firebase.database().ref();
export const usersDbRef = db.child('users');
export const habitsDbRef = db.child('habits');
