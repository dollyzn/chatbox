import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import BackdropLoading from "../components/BackdropLoading";
import LoggedInLayout from "../layout";

export const PrivateRoute = ({ Item }) => {
  const { signed, loading } = useContext(AuthContext);

  return (
    <LoggedInLayout>
      {loading && <BackdropLoading />}
      {signed ? <Item /> : <Navigate to="/login" />}
    </LoggedInLayout>
  );
};
