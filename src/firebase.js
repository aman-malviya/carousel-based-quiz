import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDDuHuR_H05eiVjZJxudUG3H3F_tjdG28k",
  authDomain: "contact-form-ae96f.firebaseapp.com",
  databaseURL: "https://contact-form-ae96f.firebaseio.com",
  projectId: "contact-form-ae96f",
  storageBucket: "contact-form-ae96f.appspot.com",
  messagingSenderId: "893098497968",
  appId: "1:893098497968:web:1fce15587dfa1534722875",
  measurementId: "G-85JQTKJRNR"
});
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export default firebaseApp;
