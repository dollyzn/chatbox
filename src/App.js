import React from "react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context";

import AppRoutes from "./routes";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <AppRoutes />
    </AuthProvider>
  );
};
