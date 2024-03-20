// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "marketplace-mern-c6fb6.firebaseapp.com",
  projectId: "marketplace-mern-c6fb6",
  storageBucket: "marketplace-mern-c6fb6.appspot.com",
  messagingSenderId: "1094604569831",
  appId: "1:1094604569831:web:e3c019fbe1a8ca7ed47642",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
