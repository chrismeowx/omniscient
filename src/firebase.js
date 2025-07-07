// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBTg8mCUrrXE_v_4kz5LkiTvQk5iJismU",
  authDomain: "todolist-6deff.firebaseapp.com",
  databaseURL: "https://todolist-6deff-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todolist-6deff",
  storageBucket: "todolist-6deff.firebasestorage.app",
  messagingSenderId: "839930394928",
  appId: "1:839930394928:web:30a542f92727931d8530f5",
  measurementId: "G-W6YRZHR40M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);