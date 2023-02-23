import { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
// import { makeStyles } from "@mui/material/core/styles";
import { makeStyles } from "@mui/styles";
import { useAppDispatch } from "state/hook";
import { auth } from "state/auth/authOperations";

const useStyles = makeStyles((theme: any): { form: any; submit: any } => ({
  form: {
    width: "100%", // ширина формы
    // marginTop: theme.spacing(1), // отступ сверху
  },
  submit: {
    // margin: theme.spacing(3, 0, 2), // отступ кнопки
  },
}));

export const Form = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(auth({ name: username, password }));
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Вход
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <FormControl fullWidth margin="normal">
          <TextField
            variant="outlined"
            label="Имя пользователя"
            value={username}
            onChange={handleUsernameChange}
            name="name"
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            variant="outlined"
            label="Пароль"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Войти
        </Button>
      </form>
    </Container>
  );
};

// export default Form;
