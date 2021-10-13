import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAi-dKZ1oWvVvd2hSHoOdei_Z9AGBpQM38",
    authDomain: "guias-transporte-b39c1.firebaseapp.com",
    projectId: "guias-transporte-b39c1",
    storageBucket: "guias-transporte-b39c1.appspot.com",
    messagingSenderId: "28525567414",
    appId: "1:28525567414:web:457659200f27503dd8b517"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    googleAuthProvider,
    firebase
}