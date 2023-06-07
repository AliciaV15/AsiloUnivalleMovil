// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4nnLzYcNwvAtdpl3UPePRiSETjXbvkXo",
  authDomain: "asilo-216aa.firebaseapp.com",
  databaseURL: "https://asilo-216aa-default-rtdb.firebaseio.com",
  projectId: "asilo-216aa",
  storageBucket: "asilo-216aa.appspot.com",
  messagingSenderId: "734552314732",
  appId: "1:734552314732:web:198c8a8412c7353c931949",
  measurementId: "G-SJWYV82KJC"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const database = getFirestore(); 
