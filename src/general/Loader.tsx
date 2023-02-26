import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(${"-50%"}, ${"-50%"})`,
  },
}));

export default function Loader() {
  const classes = useStyles();
  return (
    <Box className={classes.loader}>
      <CircularProgress color="inherit" />
    </Box>
  );
}
