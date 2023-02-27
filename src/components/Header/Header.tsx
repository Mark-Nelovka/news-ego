import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toolbar, AppBar, Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import Form from "components/Form";
import NavMenu from "./components/NavMenu";
import { ButtonGen } from "general";
import { useAppDispatch, useAppSelector } from "state/hook";
import { logOut } from "state/auth/authOperations";
import { theme } from "styles/theme";

const useStyles = makeStyles((theme: Theme) => ({
  buttonLanguage: {
    ...theme.typography.body1,
    fontSize: 15,
    minWidth: "auto",
    "&:not(:last-child)": {
      marginRight: 20,
    },
  },
}));

function Header() {
  const [open, setOpen] = useState(false);
  const isToken = useAppSelector((state) => state.auth.token);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation("translation");
  const classes = useStyles(theme);
  const navigate = useNavigate();

  const changeLanguage = (e: React.MouseEvent) => {
    const { textContent } = e.target as HTMLButtonElement;
    i18n.changeLanguage(textContent!);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isToken && open) {
      setOpen(false);
      navigate("/profile");
    }
  }, [isToken, navigate, open]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <NavMenu />
          <ButtonGen style={classes.buttonLanguage} onClick={changeLanguage}>
            {t("header.language.ua")}
          </ButtonGen>
          {isToken && (
            <ButtonGen
              style={classes.buttonLanguage}
              onClick={() => dispatch(logOut())}
            >
              {t("header.auth.logout")}
            </ButtonGen>
          )}
          {!isToken && (
            <ButtonGen
              style={classes.buttonLanguage}
              onClick={() => setOpen(!open)}
            >
              {t("header.auth.login")}
            </ButtonGen>
          )}
        </Toolbar>
      </AppBar>
      {open && (
        <Form isOpen={open} handleClose={handleClose} isLoading={isLoading} />
      )}
    </>
  );
}

export default Header;
