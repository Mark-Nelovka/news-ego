import { Box } from "@mui/material";
import React from "react";
import ErrorImage from "assets/images/Error.jpeg";

export default function ErrorPage() {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <img src={ErrorImage} alt="error " />
    </Box>
  );
}
