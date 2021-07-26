import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB3hjX7I6Us0uAAOtpRUeikvdj1OzkxujY",
  authDomain: "qcm-independence-day-quiz.firebaseapp.com",
  projectId: "qcm-independence-day-quiz",
  storageBucket: "qcm-independence-day-quiz.appspot.com",
  messagingSenderId: "374687441790",
  appId: "1:374687441790:web:0152d3cba87f948797c92f",
  measurementId: "G-KQ5LNKH1E4"
});
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export default firebaseApp;
