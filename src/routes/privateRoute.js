import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context";

import BackdropLoading from "../components/BackdropLoading";

export const PrivateRoute = ({ Item }) => {
  const { signed, loading } = useContext(AuthContext);

  return (
    <>
      {loading && <BackdropLoading />}
      {signed ? <Item /> : <Navigate to="/login" />}
    </>
  );
};
