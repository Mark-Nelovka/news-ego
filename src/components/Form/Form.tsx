import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { Theme } from "@material-ui/core";
import { auth } from "state/auth/authOperations";
import { useAppDispatch, useAppSelector } from "state/hook";
import { ButtonGen, ModalForm } from "general";
import { Loader } from "general";
import Field from "./components/Field";
import validation from "./helpers/validation";
import { theme } from "styles/theme";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: "100%",
    background: "#01b838",
    color: "#fff",
    "&:hover": {
      background: "#03cf40",
    },
  },
  title: {
    ...theme.typography.body2,
    fontSize: 34,
    textAlign: "center",
    marginTop: 3,
  },
}));

interface IFormProps {
  isOpen: boolean;
  handleClose: () => void;
  isLoading: boolean;
}

export const Form = ({ isOpen, handleClose, isLoading }: IFormProps) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageName, setErrorMessageName] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");

  const isError = useAppSelector((state) => state.auth.error);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("translation");
  const classes = useStyles(theme);

  useEffect(() => {
    isError.name === "Invalid" &&
      setErrorMessageName(t("invalidName") as string);

    isError.password === "Invalid" &&
      setErrorMessagePassword(t("invalidPassword") as string);
  }, [isError, t]);

  const handleError = (name: string): void => {
    if (name === "name")
      return setErrorMessageName(t("form.error.name") as string);
    setErrorMessagePassword(t("form.error.passwordSymbols") as string);
  };

  const handleField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const valid = validation({ name, value, handleError });
    if (valid || valid === "") {
      switch (name) {
        case "name":
          setUserName(valid);
          setErrorMessageName("");
          break;
        case "password":
          setPassword(valid);
          setErrorMessagePassword("");
          break;
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length < 4) {
      setErrorMessagePassword(t("form.error.passwordLength") as string);
      return;
    }
    dispatch(auth({ name: username, password }));
  };

  return (
    <ModalForm isOpen={isOpen} handleClose={handleClose}>
      <Typography className={classes.title} gutterBottom>
        {t("form.title")}
      </Typography>
      {isLoading && <Loader />}
      {!isLoading && (
        <form onSubmit={handleSubmit}>
          <Field
            variant="outlined"
            label={`${t("form.label.name")}`}
            error={errorMessageName ? true : false}
            value={username}
            onChange={handleField}
            name="name"
            type="text"
            errorMessage={errorMessageName}
          />
          <Field
            variant="outlined"
            label={`${t("form.label.password")}`}
            type="password"
            name="password"
            error={errorMessagePassword ? true : false}
            value={password}
            errorMessage={errorMessagePassword}
            onChange={handleField}
          />
          <ButtonGen style={classes.button}>{t("header.auth.login")}</ButtonGen>
        </form>
      )}
    </ModalForm>
  );
};
