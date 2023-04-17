import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getErrorMessage } from "../errors";
import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
} from "firebase/auth";

import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const user = Cookies.get("user") ? Cookies.get("user") : null;
    const loadUserData = async () => {
      if (user) {
        try {
          const cryptoKey = process.env.REACT_APP_CRYPTO_KEY;
          const decryptedUserJSON = CryptoJS.AES.decrypt(
            user,
            cryptoKey
          ).toString(CryptoJS.enc.Utf8);

          const userJSON = JSON.parse(decryptedUserJSON);

          const response = await api.post("/auth");

          const data = response.data;

          if (
            response.status === 200 &&
            userJSON.uid === data.user.uid &&
            userJSON.email === data.user.email
          ) {
            setUser(userJSON);
            setSigned(true);
          } else {
            setUser(null);
            setSigned(false);
            Cookies.remove("user");
            console.error("Usuário inválido");
          }
        } catch (error) {
          setUser(null);
          setSigned(false);
          Cookies.remove("user");
          console.error("Ocorreu um erro: " + error);
        }
      }
      setLoading(false);
    };
    loadUserData();
  }, []);

  const handleSuccess = (user) => {
    const userJSON = JSON.stringify(user);
    const cryptoKey = process.env.REACT_APP_CRYPTO_KEY;
    const encryptedUser = CryptoJS.AES.encrypt(userJSON, cryptoKey).toString();
    Cookies.set("user", encryptedUser, { expires: 1 });
    setUser(user);
    setSigned(true);
    setLoginLoading(false);

    toast.success("Usuário autenticado com sucesso!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleError = (error, emailRef, passwordRef, setFormError) => {
    const errorMessage = getErrorMessage(error);
    setLoginLoading(false);

    switch (error.code) {
      case "auth/wrong-password":
        setFormError({
          [passwordRef.current.firstChild.name]: errorMessage,
        });
        break;
      case "auth/email-already-in-use":
        setFormError({
          [emailRef.current.firstChild.name]: errorMessage,
        });
        break;
      case "auth/user-not-found":
        setFormError({
          [emailRef.current.firstChild.name]: errorMessage,
        });
        break;
      default:
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
    }
  };

  const Login = async (
    email,
    password,
    emailRef,
    passwordRef,
    setFormError
  ) => {
    setLoginLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = {
        uid: userCredential.user.uid,
        token: userCredential.user.accessToken,
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
      };

      handleSuccess(user);
    } catch (error) {
      handleError(error, emailRef, passwordRef, setFormError);
    }
  };

  const SignUp = async (
    name,
    email,
    password,
    emailRef,
    passwordRef,
    setFormError
  ) => {
    setLoginLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      try {
        await updateProfile(userCredential.user, { displayName: name });

        const user = {
          uid: userCredential.user.uid,
          token: userCredential.user.accessToken,
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL,
        };

        handleSuccess(user);
      } catch (error) {
        handleError(error, emailRef, passwordRef, setFormError);
      }
    } catch (error) {
      handleError(error, emailRef, passwordRef, setFormError);
    }
  };

  const GoogleSign = async (auth, provider) => {
    setLoginLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, provider);

      const user = {
        uid: userCredential.user.uid,
        token: userCredential.user.accessToken,
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
      };

      handleSuccess(user);
    } catch (error) {
      handleError(error);
    }
  };

  const SignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      Cookies.remove("user");
      setUser(null);
      setSigned(false);
      setLoading(false);
      toast.warn("Usuário desconectado", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed,
        loading,
        loginLoading,
        Login,
        SignUp,
        SignOut,
        GoogleSign,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
