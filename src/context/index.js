// import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const fbuser = useAuthState(auth);
  const [signed, setSigned] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const firebaseUser = localStorage.getItem("Auth:user");
    console.log(localStorage.getItem("Auth:user"));
    const loadingStoreData = async () => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setSigned(true);
      }
    };
    loadingStoreData();
  }, []);

  const Login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        setSigned(true);
        localStorage.setItem("Auth:user", user.accessToken);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const SignUp = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        setSigned(true);
        localStorage.setItem("Auth:user", user.accessToken);
        console.log("va te fude");
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };

  const SignOut = async () => {
    signOut(auth);
    setUser(null);
    setSigned(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed,
        Login,
        SignUp,
        SignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
