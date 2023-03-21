import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import { auth, provider } from "../../config/firebase";
import { AuthContext } from "../../context";
import { Link as RouterLink } from "react-router-dom";

import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import GoogleIcon from "@mui/icons-material/Google";
import loginIcon from "../../assets/icon.png";

const theme = createTheme();

const Login = () => {
  const { Login, GoogleSign, signed } = useContext(AuthContext);
  const [formError, setFormError] = useState({});

  function RenderLink(props) {
    const { to, variant, text } = props;

    const renderLink = React.useMemo(
      () =>
        React.forwardRef((itemProps, ref) => (
          <RouterLink to={to} ref={ref} {...itemProps} />
        )),
      [to]
    );

    return (
      <Link component={renderLink} variant={variant}>
        {text}
      </Link>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    try {
      await loginSchema.validate(values, { abortEarly: false });
      Login(data.get("email"), data.get("password"));
    } catch (error) {
      const errors = {};

      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });

      setFormError(errors);
    }
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um email válido")
      .required("O email é obrigatório"),
    password: Yup.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("A senha é obrigatória"),
  });

  if (signed) {
    return <Navigate to="/home" />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={loginIcon}
              width="150px"
              alt="Logo Icon"
              draggable="false"
            />
            <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                error={Boolean(formError.email)}
                helperText={formError.email}
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                error={Boolean(formError.password)}
                helperText={formError.password}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onClick={() => GoogleSign(auth, provider)}
                startIcon={<GoogleIcon />}
              >
                Entrar com o Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <RenderLink
                    to="/signup"
                    variant="body2"
                    text="Não tem uma conta? Cadastre-se!"
                  ></RenderLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
    );
  }
};

export default Login;
