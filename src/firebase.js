import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCNscTqFUf8Wkh55ZwuVMSHYcjMz0HJ0eQ",
  authDomain: "recruitments2021-619b8.firebaseapp.com",
  projectId: "recruitments2021-619b8",
  storageBucket: "recruitments2021-619b8.appspot.com",
  messagingSenderId: "586285876118",
  appId: "1:586285876118:web:e5f6bf7cf500765d2413b7",
  measurementId: "G-Y1531RJLNF"
});
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export default firebaseApp;
