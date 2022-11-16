// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0nmPjUD2xn89I8XYQCs5RHQs5prFw8Lw",
  authDomain: "u-wait.firebaseapp.com",
  projectId: "u-wait",
  storageBucket: "u-wait.appspot.com",
  messagingSenderId: "864746260118",
  appId: "1:864746260118:web:20fb990d56e69f14b824b7",
  measurementId: "G-7Z3HC8PDH0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db: Firestore = getFirestore(app);
export { db };
