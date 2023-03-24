import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
} from "firebase/auth";

import BackdropLoading from "../components/BackdropLoading";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const loadingStoreData = async () => {
      let userJSON = JSON.parse(user);
      if (token && userJSON) {
        setUser(userJSON);
        setSigned(true);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    loadingStoreData();
  }, []);

  const Login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      setUser(user);
      setSigned(true);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.accessToken);
      toast.success("Usuário autenticado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };

  const SignUp = async (name, email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      setUser(user);
      setSigned(true);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.accessToken);
      toast.success("Usuário autenticado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };

  const GoogleSign = async (auth, provider) => {
    try {
      const userCredential = await signInWithPopup(auth, provider);

      const user = userCredential.user;

      setUser(user);
      setSigned(true);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.accessToken);
      toast.success("Usuário autenticado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const SignOut = async () => {
    setLoading(true);
    try {
      signOut(auth);
      setUser(null);
      setSigned(false);
      localStorage.clear();
      toast.warn("Usuário desconectado", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };

  if (loading) {
    return <BackdropLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signed,
        loading,
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
