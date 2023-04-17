import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "projetofinal-93261.firebaseapp.com",
  projectId: "projetofinal-93261",
  storageBucket: "projetofinal-93261.appspot.com",
  messagingSenderId: "838530592218",
  appId: "1:838530592218:web:264841af489c86053b24e3",
  measurementId: "G-1WQTK6PNZV",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
