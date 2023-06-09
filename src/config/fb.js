// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDpDsLxqCAgUPW8E0fkQTMS19r3NPdUBYY",
    authDomain: "testasilo.firebaseapp.com",
    projectId: "testasilo",
    storageBucket: "testasilo.appspot.com",
    messagingSenderId: "867664140918",
    appId: "1:867664140918:web:a329df7c8fab6692c11d57"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const database = getFirestore(); 
