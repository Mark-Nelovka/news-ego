import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(${"-50%"}, ${"-50%"})`,
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Loader({ size }: { size?: number }) {
  const classes = useStyles();
  return (
    <Box className={classes.loader}>
      <CircularProgress size={size} color="inherit" />
    </Box>
  );
}
