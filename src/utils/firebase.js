// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDup_VOdrz6e7LVsFhPafp6OYs-Jgplt90",
  authDomain: "netflixgpt-3644a.firebaseapp.com",
  projectId: "netflixgpt-3644a",
  storageBucket: "netflixgpt-3644a.firebasestorage.app",
  messagingSenderId: "464385846282",
  appId: "1:464385846282:web:a9553b5a899180d1e703f3",
  measurementId: "G-4P4EX62KXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();