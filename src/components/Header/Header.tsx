import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { List } from "@mui/material";
import { theme } from "styles/theme";
import { useAppDispatch, useAppSelector } from "state/hook";
import { logOut } from "state/auth/authOperations";

export default function Header() {
  const login = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Toolbar>
          <List component="nav" sx={{ mr: "auto" }}>
            <List component="ul" sx={{ display: "flex" }}>
              <List component="li" sx={{ mr: 6 }}>
                <Typography
                  variant="body1"
                  color={theme.palette.secondary.main}
                  component={Link}
                  to="/news-ego"
                >
                  Home
                </Typography>
              </List>
              <List component="li" sx={{ mr: 6 }}>
                <Typography
                  variant="body1"
                  color={theme.palette.secondary.main}
                  component={Link}
                  to="/news-ego/news"
                >
                  News
                </Typography>
              </List>
              <List component="li">
                <Typography
                  variant="body1"
                  color={theme.palette.secondary.main}
                  component={Link}
                  to="/news-ego/profile"
                >
                  Profile
                </Typography>
              </List>
            </List>
          </List>
          {!login ? (
            <Typography component="button" variant="body1" color="inherit">
              Login
            </Typography>
          ) : (
            <Typography
              component="button"
              onClick={() => dispatch(logOut())}
              variant="body1"
              color="inherit"
            >
              Logout
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
