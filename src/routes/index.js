import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./privateRoute";

import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home/index.js";
import Chat from "../pages/Chat";

const AppRoutes = () => {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<PrivateRoute Item={Home} />} />
          <Route path="/chat" element={<PrivateRoute Item={Chat} />} />
        </Routes>
      </Fragment>
    </Router>
  );
};

export default AppRoutes;
