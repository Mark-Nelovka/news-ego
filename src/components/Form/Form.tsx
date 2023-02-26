import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ButtonGen } from "general";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { useAppDispatch, useAppSelector } from "state/hook";
import { auth } from "state/auth/authOperations";
import { theme } from "styles/theme";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { Theme } from "@material-ui/core";

const CustomizedSlider = styled(Button)(
  ({ theme }) =>
    `
  color: ${theme.palette.primary.main};

  :hover {
    color: ${theme.palette.secondary.main};
  }
`
);

const useStyles = makeStyles(
  (
    theme: Theme
  ): { form: any; submit: any; paper: any; loader: any; button: any } => ({
    form: {
      width: "100%",
    },
    submit: {},
    paper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: `translate(${"-50%"}, ${"-50%"})`,
      backgroundColor: "#fff",
      padding: 40,
      minHeight: 400,
    },
    loader: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: `translate(${"-50%"}, ${"-50%"})`,
    },
    button: {
      padding: 5,
      // background: "#000",
      // fontFamily: theme.typography. ,
      width: "auto",
      marginRight: 15,
    },
  })
);

interface IFormProps {
  isOpen: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

interface IValidField {
  name?: string | null;
  password?: string | null;
}

export const Form = ({ isOpen, handleClose, isLoading }: IFormProps) => {
  const { t } = useTranslation("translation");

  const classes = useStyles(theme);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    name: true,
    password: true,
  });
  const [validErrorMessage, setValidErrorMessage] = useState<IValidField>({
    name: null,
    password: null,
  });
  const isError = useAppSelector((state) => state.auth.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isError.name || !isError.password) {
      setError({
        name: isError.name,
        password: isError.password,
      });
    }
  }, [isError]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length === 0 || /^[a-zA-Z]+$/.test(value)) {
      setUsername(value);
      setValidErrorMessage({
        name: null,
      });
      setError((prevState) => {
        return {
          ...prevState,
          name: true,
        };
      });
      return;
    }
    setValidErrorMessage({
      name: `${t("form.error.name")}`,
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length === 0 || /^[0-9]/.test(value)) {
      setPassword(value);

      if (password.length < 4) {
        setValidErrorMessage({
          password: `${t("form.error.password")}`,
        });
        return;
      }
      setValidErrorMessage({
        password: null,
      });
      setError((prevState) => {
        return {
          ...prevState,
          password: true,
        };
      });
      return;
    }
    setValidErrorMessage({
      password: "Only number",
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(auth({ name: username, password }));
  };

  return (
    <Modal open={isOpen} onClose={() => handleClose(!isOpen)}>
      <Container maxWidth="xs" className={classes.paper}>
        {/* <Button
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 7,
            right: 7,
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "#ff00001b",
            padding: 0,
            minWidth: "max-content",
          }}
        > */}
        <CustomizedSlider>
          <CloseIcon fontSize="medium" />
        </CustomizedSlider>
        {/* </Button> */}
        <Typography variant="h4" align="center" gutterBottom>
          {t("form.title")}
        </Typography>
        {isLoading && (
          <Box className={classes.loader}>
            <CircularProgress color="inherit" />
          </Box>
        )}
        {!isLoading && (
          <form onSubmit={handleSubmit} className={classes.form}>
            <FormControl
              fullWidth
              sx={{ height: 100 }}
              error={validErrorMessage.name || !error.name ? true : false}
              margin="normal"
            >
              <TextField
                variant="outlined"
                label={`${t("form.label.name")}`}
                error={validErrorMessage.name || !error.name ? true : false}
                value={username}
                onChange={handleUsernameChange}
                name="name"
                required
              />
              <FormHelperText id="component-error-text">
                {validErrorMessage.name && validErrorMessage.name}
                {!error.name &&
                  !validErrorMessage.name &&
                  t("form.error.invalidName")}
              </FormHelperText>
            </FormControl>
            <FormControl
              fullWidth
              sx={{ height: 100 }}
              margin="normal"
              error={
                validErrorMessage.password || !error.password ? true : false
              }
            >
              <TextField
                variant="outlined"
                label={`${t("form.label.password")}`}
                type="password"
                name="password"
                error={
                  validErrorMessage.password || !error.password ? true : false
                }
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <FormHelperText id="component-error-text">
                {validErrorMessage.password && validErrorMessage.password}
                {!error.password &&
                  !validErrorMessage.password &&
                  t("form.error.invalidPassword")}
              </FormHelperText>
            </FormControl>
            <ButtonGen style={classes.button}>
              {t("header.auth.login")}
            </ButtonGen>
          </form>
        )}
      </Container>
    </Modal>
  );
};

// export default Form;
