import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMkSItPB1cpvUqv9f9GcZpOdxBGfgh0AQ",
  authDomain: "projetofinal-93261.firebaseapp.com",
  projectId: "projetofinal-93261",
  storageBucket: "projetofinal-93261.appspot.com",
  messagingSenderId: "838530592218",
  appId: "1:838530592218:web:3ad11c9c9067fc903b24e3",
  measurementId: "G-RN3P10HPNF",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
