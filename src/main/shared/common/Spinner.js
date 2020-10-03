import React from "react";
import { Typography, CircularProgress } from "@material-ui/core";

function Spinner({ size, message }) {
  return (
    <>
      <CircularProgress size={size} />
      <Typography style={{ marginTop: "32px" }}>{message}</Typography>
    </>
  );
}

export default Spinner;
