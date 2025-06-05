// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7kQ0jjCU4--NM6K3FwtkUQ1_8P9onlSo",
  authDomain: "insta-nest.firebaseapp.com",
  projectId: "insta-nest",
  storageBucket: "insta-nest.firebasestorage.app",
  messagingSenderId: "325926792546",
  appId: "1:325926792546:web:9e7e33a1ee77c3eb3b103b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
