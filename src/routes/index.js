import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home/index.js";
import { PrivateRoute } from "./privateRoutes";

// const Private = ({ Item }) => {
//   const [user] = useAuthState(auth);

//   return user ? <Item /> : <Login />;
// };

const AppRoutes = () => {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/home" element={<PrivateRoute />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </Router>
  );
};

export default AppRoutes;
