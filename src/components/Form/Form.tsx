import { useEffect, useState } from "react";
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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { makeStyles } from "@mui/styles";
import { useAppDispatch } from "state/hook";
import { auth } from "state/auth/authOperations";
import { theme } from "styles/theme";
import { Box } from "@mui/system";

const useStyles = makeStyles(
  (theme: any): { form: any; submit: any; paper: any; loader: any } => ({
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
  })
);

interface IFormProps {
  isOpen: boolean;
  handleClose: () => void;
  isLogin: string | null;
  isLoading: boolean;
}

interface IValidField {
  name?: string | null;
  password?: string | null;
}

export const Form = ({
  isOpen,
  handleClose,
  isLogin,
  isLoading,
}: IFormProps) => {
  const classes = useStyles(theme);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validErrorMessage, setValidErrorMessage] = useState<IValidField>({
    name: null,
    password: null,
  });

  const dispatch = useAppDispatch();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length === 0 || /^[a-zA-Z]+$/.test(value)) {
      setUsername(value);
      setValidErrorMessage({
        name: null,
      });
      return;
    }
    setValidErrorMessage({
      name: "Only english word",
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length === 0 || /^[0-9]/.test(value)) {
      setPassword(value);

      if (password.length < 4) {
        setValidErrorMessage({
          password: "Password length must be more 4 symbols",
        });
        return;
      }
      setValidErrorMessage({
        password: null,
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

  useEffect(() => {
    if (isLogin) {
      handleClose();
    }
  }, [isLogin, handleClose]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Container maxWidth="xs" className={classes.paper}>
        <Button
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 7,
            right: 7,
            width: 30,
            height: 30,
            borderRadius: "50%",
            // background: "#000",
            padding: 0,
            minWidth: "max-content",
          }}
        >
          <DeleteForeverIcon fontSize="medium" />
        </Button>
        <Typography variant="h4" align="center" gutterBottom>
          Вход
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
              error={validErrorMessage.name ? true : false}
              margin="normal"
            >
              <TextField
                variant="outlined"
                label="Name"
                error={validErrorMessage.name ? true : false}
                value={username}
                onChange={handleUsernameChange}
                name="name"
                required
              />
              <FormHelperText id="component-error-text">
                {validErrorMessage.name && validErrorMessage.name}
              </FormHelperText>
            </FormControl>
            <FormControl
              fullWidth
              sx={{ height: 100 }}
              margin="normal"
              error={validErrorMessage.password ? true : false}
            >
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                name="password"
                error={validErrorMessage.password ? true : false}
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <FormHelperText id="component-error-text">
                {validErrorMessage.password && validErrorMessage.password}
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
        )}
      </Container>
    </Modal>
  );
};

// export default Form;
