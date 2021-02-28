import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClMxSzA5mpXwDN4wr35NZnCgXH-44CydA",
  authDomain: "starting-over-again.firebaseapp.com",
  projectId: "starting-over-again",
  storageBucket: "starting-over-again.appspot.com",
  messagingSenderId: "1017766405253",
  appId: "1:1017766405253:web:d36cb1e2aa320a635835ec"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();