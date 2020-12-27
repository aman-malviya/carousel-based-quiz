import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC8CbnHmGM0Ocsz-XCyR41qlk9SaNAwY2A",
  authDomain: "qcm-vihaan-950a8.firebaseapp.com",
  projectId: "qcm-vihaan-950a8",
  storageBucket: "qcm-vihaan-950a8.appspot.com",
  messagingSenderId: "457328054650",
  appId: "1:457328054650:web:9277517c4565f750ca86c3",
  measurementId: "G-RW54EH0T5D",
});
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export default firebaseApp;
