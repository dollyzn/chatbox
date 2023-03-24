import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, provider } from "../../config/firebase";
import { AuthContext } from "../../context";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";

import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import GoogleIcon from "@mui/icons-material/Google";
import loginIcon from "../../assets/icon.png";

const theme = createTheme();

const SignUp = () => {
  const { SignUp, GoogleSign, signed } = useContext(AuthContext);
  const [formError, setFormError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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
      await signUpSchema.validate(values, { abortEarly: false });
      SignUp(data.get("name"), data.get("email"), data.get("password"));
    } catch (error) {
      const errors = {};

      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });

      setFormError(errors);
    }
  };

  const signUpSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
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
              Cadastre-se
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    fullWidth
                    id="name"
                    label="Nome"
                    error={Boolean(formError.name)}
                    helperText={formError.name}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    error={Boolean(formError.email)}
                    helperText={formError.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Senha"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    error={Boolean(formError.password)}
                    helperText={formError.password}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => setShowPassword(!showPassword)}
                      />
                    }
                    label="Mostrar senha"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: 14,
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
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
              <Grid container justifyContent="flex-end">
                <Grid item xs>
                  <RenderLink
                    to="/login"
                    variant="body2"
                    text="Já possui uma conta? Entre!"
                  ></RenderLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
};

export default SignUp;
