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
    subtitle1: {
      fontFamily: "Raleway",
      fontSize: 14,
    }
  },
  palette: {
    primary: {
      main: "#2196f3",
    },
    
    secondary: {
      main: "#fff",
      },
      error: {
          main: "#d32f2f",
          dark: "#c62828"
      },
      success: {
          main: "#2e7d32",
          light: "#4caf50",
      }
  },

});