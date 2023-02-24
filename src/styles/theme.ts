import { createTheme } from '@mui/material/styles';

// We also will adding new styles till doing markup

export const theme = createTheme({
  typography: {
    body1: {
         fontFamily: "Raleway",
         fontSize: 22,
      padding: 5
    },
    body2: {
      fontFamily: "Raleway",
      fontSize: 18,
            // padding: 5

    },
    subtitle1: {
      fontFamily: "Raleway",
      fontSize: 14,
            // padding: 5

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