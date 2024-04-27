// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCMGactAuHr9ndqBe954oTZ-726o96F-E",
  authDomain: "quantum-delivery.firebaseapp.com",
  projectId: "quantum-delivery",
  storageBucket: "quantum-delivery.appspot.com",
  messagingSenderId: "314703053769",
  appId: "1:314703053769:web:fa642a8749a3e206f65e18",
  measurementId: "G-VE40M2BYSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };