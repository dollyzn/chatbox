import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import "./App.css";
import AppRoutes from "./routes";
import { AuthProvider } from "./context";

export const App = () => {
  const [user] = useAuthState(auth);
  console.log(user);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};
