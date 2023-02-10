import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context";

export const PrivateRoute = ({ Item }) => {
  const { signed } = useContext(AuthContext);

  return signed ? <Item /> : <Navigate to="/login" />;
};
