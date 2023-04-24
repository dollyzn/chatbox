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
  signInWithCustomToken,
} from "firebase/auth";

import CryptoJS from "crypto-js";

import api from "../services/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("token") ?? null;
    const loadUserData = async () => {
      if (user) {
        api.defaults.headers.Authorization = `Bearer ${user}`;
        try {
          const decryptedUserJSON = encryptAndDecryptToken(user, true);
          const prevUser = JSON.parse(decryptedUserJSON);

          const response = await api.post("/auth");

          const userCredential = await signInWithCustomToken(
            auth,
            response.data.token
          );

          const customTokenUser = {
            uid: userCredential.user.uid,
            token: userCredential.user.accessToken,
            name: userCredential.user.displayName,
            email: userCredential.user.email,
            photoURL: userCredential.user.photoURL,
          };

          if (
            response.status === 200 &&
            prevUser.uid === customTokenUser.uid &&
            prevUser.email === customTokenUser.email
          ) {
            handleSuccess(customTokenUser);
          } else {
            setUser(null);
            setSigned(false);
            localStorage.removeItem("token");
            console.error("Usuário inválido");
          }
        } catch (error) {
          setUser(null);
          setSigned(false);
          localStorage.removeItem("token");
          console.error("Ocorreu um erro: " + error);
        }
      }
      setLoading(false);
    };
    loadUserData();
  }, []);

  const refreshAuthToken = async () => {
    try {
      const response = await api.post("/auth");

      const userCredential = await signInWithCustomToken(
        auth,
        response.data.token
      );

      const customTokenUser = {
        uid: userCredential.user.uid,
        token: userCredential.user.accessToken,
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
      };

      const encryptedUser = encryptAndDecryptToken(
        JSON.stringify(customTokenUser),
        false
      );

      api.defaults.headers.Authorization = `Bearer ${encryptedUser}`;
      localStorage.setItem("token", encryptedUser);
    } catch (error) {
      console.error(error);
    }
  };
  setInterval(refreshAuthToken, 3300000);

  const encryptAndDecryptToken = (token, isEncrypt = true) => {
    const cryptoKey = process.env.REACT_APP_CRYPTO_KEY;

    try {
      if (isEncrypt) {
        const decryptedToken = CryptoJS.AES.decrypt(token, cryptoKey).toString(
          CryptoJS.enc.Utf8
        );

        return decryptedToken;
      } else {
        const encryptedToken = CryptoJS.AES.encrypt(
          token,
          cryptoKey
        ).toString();

        return encryptedToken;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSuccess = (user) => {
    const encryptedUser = encryptAndDecryptToken(JSON.stringify(user), false);
    api.defaults.headers.Authorization = `Bearer ${encryptedUser}`;
    localStorage.setItem("token", encryptedUser);

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
        const userAvatar = `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${name}`;

        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: userAvatar,
        });

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
      localStorage.removeItem("token");
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
