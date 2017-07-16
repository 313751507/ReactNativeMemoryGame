import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBIpL2OB1mi63Cd2LhlQY34lvKn_RepqD8",
  authDomain: "mobilecompanygame.firebaseapp.com",
  databaseURL: "https://mobilecompanygame.firebaseio.com",
  projectId: "mobilecompanygame",
  storageBucket: "mobilecompanygame.appspot.com",
  messagingSenderId: "671262548281"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
