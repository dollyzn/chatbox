import React from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const BackdropLoading = () => {
  return (
    <Backdrop className="backdrop" sx={{ color: "#fff" }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropLoading;
