import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context";
import Login from "../pages/Login";
import Home from "../pages/Home/index.js";

export const PrivateRoute = () => {
  const { signed } = useContext(AuthContext);
  console.log("signed", signed);

  return signed ? <Home /> : <Login />;
};
