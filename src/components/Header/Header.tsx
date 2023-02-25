import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { List } from "@mui/material";
import { theme } from "styles/theme";
import { useAppDispatch, useAppSelector } from "state/hook";
import { logOut } from "state/auth/authOperations";
import Form from "components/Form";
import { useTranslation } from "react-i18next";
// import { TFunction } from "i18next";
function Header() {
  const { t, i18n } = useTranslation("translation");
  // tFunction: TFunction
  // const tFunction =;
  const [open, setOpen] = useState(false);
  const login = useAppSelector((state) => state.auth.token);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeLanguage = (e: React.MouseEvent) => {
    const { textContent } = e.target as HTMLButtonElement;
    i18n.changeLanguage(textContent!);
  };

  return (
    <>
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
                    {t("header.home")}
                  </Typography>
                </List>
                <List component="li" sx={{ mr: 6 }}>
                  <Typography
                    variant="body1"
                    color={theme.palette.secondary.main}
                    component={Link}
                    to="/news-ego/news"
                  >
                    {t("header.news")}
                  </Typography>
                </List>
                <List component="li">
                  <Typography
                    variant="body1"
                    color={theme.palette.secondary.main}
                    component={Link}
                    to="/news-ego/profile"
                  >
                    {t("header.profile")}
                  </Typography>
                </List>
              </List>
            </List>
            <Typography
              onClick={changeLanguage}
              component="button"
              variant="body1"
              sx={{ mr: 3 }}
              color="inherit"
            >
              {t("header.language.ua")}
            </Typography>
            {!login ? (
              <Typography
                onClick={handleOpen}
                component="button"
                variant="body1"
                color="inherit"
              >
                {t("header.auth.login")}
              </Typography>
            ) : (
              <Typography
                component="button"
                onClick={() => dispatch(logOut())}
                variant="body1"
                color="inherit"
              >
                {t("header.auth.logout")}
              </Typography>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {open && (
        <Form
          isOpen={open}
          handleClose={handleClose}
          isLogin={login}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default Header;
