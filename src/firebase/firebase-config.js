import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCnAD0JTKvx8LL6-RGVNw7wy25tEBucfjM",
    authDomain: "reactbase-ae5c2.firebaseapp.com",
    databaseURL: "https://reactbase-default-rtdb.firebaseio.com",
    projectId: "reactbase",
    storageBucket: "reactbase.appspot.com",
    messagingSenderId: "1098123849794",
    appId: "1:1098123849794:web:af9c4de0509674a0737ddb"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    googleAuthProvider,
    firebase
}