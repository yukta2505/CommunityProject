// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDZuT3rbaGAbppr-DPQqvfo-dq22PoHsKI",
  authDomain: "prepwise-9a1b7.firebaseapp.com",
  projectId: "prepwise-9a1b7",
  storageBucket: "prepwise-9a1b7.firebasestorage.app",
  messagingSenderId: "900701483632",
  appId: "1:900701483632:web:da563ef083acd8b952fab5",
  measurementId: "G-RPRY8KB3FE"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);