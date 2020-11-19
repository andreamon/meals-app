import firebase from "firebase";

import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAYu_HFB2LdUGBhhO2mJ2L3jvWuuo76XVY",
  authDomain: "meals-app-850e7.firebaseapp.com",
  databaseURL: "https://meals-app-850e7.firebaseio.com",
  projectId: "meals-app-850e7",
  storageBucket: "meals-app-850e7.appspot.com",
  messagingSenderId: "984318528181",
  appId: "1:984318528181:web:125838b551974adf3cccfc",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default { firebase, db };
