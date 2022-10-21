// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//Dev/Prod
const firebaseConfig = {
    apiKey: "AIzaSyAvOikEvB7xeEELndGrQXe1gFB1SEQSev8",
    authDomain: "react-cursos-bf8e5.firebaseapp.com",
    projectId: "react-cursos-bf8e5",
    storageBucket: "react-cursos-bf8e5.appspot.com",
    messagingSenderId: "832975106201",
    appId: "1:832975106201:web:26c3f1e0c5ba56d3140808"
};

/* const firebaseConfig = {
    apiKey: "AIzaSyA_O3EgCAPeNz7bwU7uIvoCrTR3kwFU9wI",
    authDomain: "dev-journal-testing.firebaseapp.com",
    projectId: "dev-journal-testing",
    storageBucket: "dev-journal-testing.appspot.com",
    messagingSenderId: "365287338505",
    appId: "1:365287338505:web:d99e4edae19ea3baf53ed8"
  }; */

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);