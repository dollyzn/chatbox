import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./privateRoute";

import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home/index.js";

const AppRoutes = () => {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/home" element={<PrivateRoute Item={Home} />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </Router>
  );
};

export default AppRoutes;
