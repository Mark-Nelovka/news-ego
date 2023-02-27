import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    body1: {
      fontFamily: "Raleway",
      fontSize: 20,
      padding: 5,
      color: "#fff",
      fontWeight: 500,
      letterSpacing: 1.1
    },
    body2: {
      fontFamily: "Raleway",
      fontSize: 18,
      color: "#000",
      lineHeight: 1.5
    },
  },
});