import { useAuthState } from "react-firebase-hooks/auth";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "../services/firebaseConfig";

import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";

const Private = ({ Item }) => {
  const [user] = useAuthState(auth);

  return user ? <Item /> : <Login />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default AppRoutes;
