import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import { auth, provider } from "../../config/firebase";
import { AuthContext } from "../../context";
import { Link as RouterLink } from "react-router-dom";

import { CssBaseline, Grid, Box, Container } from "@mui/material";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Typography,
  Link,
  IconButton,
  Sheet,
} from "@mui/joy";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import loginIcon from "../../assets/toolbar.png";

const Login = () => {
  const { Login, GoogleSign, signed } = useContext(AuthContext);
  const [formError, setFormError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function RenderLink(props) {
    const { to, level, underline, text } = props;

    const renderLink = React.useMemo(
      () =>
        React.forwardRef((itemProps, ref) => (
          <RouterLink to={to} ref={ref} {...itemProps} />
        )),
      [to]
    );

    return (
      <Link component={renderLink} level={level} underline={underline}>
        {text}
      </Link>
    );
  }

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await GoogleSign(auth, provider);
    setLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    try {
      await loginSchema.validate(values, { abortEarly: false });
      setFormError({});
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Sheet
          sx={{
            width: 500,
            mx: "auto",
            my: 10,
            py: 4,
            px: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
        >
          <Box>
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <img
                src={loginIcon}
                width="250px"
                alt="Logo Icon"
                draggable="false"
              />
            </Box>
            <Box sx={{ mt: 2, mb: 3 }}>
              <Typography level="h3" component="h1">
                <b>Bem vindo!</b>
              </Typography>
              <Typography level="body2">Faça login para continuar.</Typography>
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel sx={{ color: formError.email ? "#d3232f" : "" }}>
                      Email
                    </FormLabel>
                    <Input
                      fullWidth
                      size="lg"
                      id="email"
                      name="email"
                      autoComplete="email"
                      placeholder="email@exemplo.com"
                      error={Boolean(formError.email)}
                    />
                    <FormHelperText sx={{ color: "#d3232f" }}>
                      {formError.email ? formError.email : ""}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel
                      sx={{ color: formError.password ? "#d3232f" : "" }}
                    >
                      Senha
                    </FormLabel>
                    <Input
                      fullWidth
                      size="lg"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="new-password"
                      placeholder="•••••••"
                      error={Boolean(formError.password)}
                      endDecorator={
                        <IconButton
                          variant="plain"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      }
                    />
                    <FormHelperText sx={{ color: "#d3232f" }}>
                      {formError.password ? formError.password : ""}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="solid"
                sx={{ mt: 2, mb: 2 }}
              >
                Entrar
              </Button>
              <Button
                loading={loading}
                loadingPosition="start"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onClick={handleGoogleSignIn}
                startDecorator={<GoogleIcon />}
              >
                Entrar com o Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <RenderLink
                    to="/signup"
                    level="body2"
                    underline="hover"
                    text="Não tem uma conta? Cadastre-se!"
                  ></RenderLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Sheet>
      </Container>
    );
  }
};

export default Login;
