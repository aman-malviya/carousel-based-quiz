import firebase from "firebase"
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAHwW8ZQ0YodlClmxGC9sj1Y7QEcsuVJKw",
    authDomain: "qcm-vihaan.firebaseapp.com",
    projectId: "qcm-vihaan",
    storageBucket: "qcm-vihaan.appspot.com",
    messagingSenderId: "180226963749",
    appId: "1:180226963749:web:8a975a353f4f467a0b82cc",
    measurementId: "G-55R8X8WJRE"
});
// const db = firebaseApp.firestore();
const auth = firebase.auth();
export {auth};
