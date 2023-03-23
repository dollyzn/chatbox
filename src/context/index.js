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

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const loadingStoreData = async () => {
      let userJSON = JSON.parse(user);
      if (token) {
        setUser(userJSON);
        setSigned(true);
        setLoading(false);
      }
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
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
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
      })
      .catch((error) => {
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
      });
  };

  const SignOut = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
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
      })
      .catch((error) => {
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
      });
  };

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
