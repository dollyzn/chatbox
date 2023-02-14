import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context";

import AppRoutes from "./routes";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import BackdropLoading from "./components/BackdropLoading";

export const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <BackdropLoading />;
  }

  return (
    <AuthProvider>
      <ToastContainer />
      <AppRoutes />
    </AuthProvider>
  );
};
