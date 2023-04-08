import React from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const BackdropLoading = () => {
  return (
    <Backdrop className="backdrop" open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropLoading;
