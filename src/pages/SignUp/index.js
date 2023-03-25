import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, provider } from "../../config/firebase";
import { AuthContext } from "../../context";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";

import { CssBaseline, Grid, Box, Container } from "@mui/material";
import {
  IconButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Typography,
  Link,
} from "@mui/joy";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import loginIcon from "../../assets/icon.png";

const SignUp = () => {
  const { SignUp, GoogleSign, signed } = useContext(AuthContext);
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
      await signUpSchema.validate(values, { abortEarly: false });
      setFormError({});
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
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
          <Typography level="h2" sx={{ mb: 2 }}>
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
                <FormControl>
                  <FormLabel sx={{ color: formError.name ? "#d3232f" : "" }}>
                    Nome
                  </FormLabel>
                  <Input
                    fullWidth
                    size="lg"
                    autoComplete="given-name"
                    name="name"
                    id="name"
                    error={Boolean(formError.name)}
                    placeholder="Nome"
                    autoFocus
                  />
                  <FormHelperText sx={{ color: "#d3232f" }}>
                    {formError.name ? formError.name : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
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
              Cadastrar
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
            <Grid container justifyContent="flex-end">
              <Grid item xs>
                <RenderLink
                  to="/login"
                  level="body2"
                  underline="hover"
                  text="Já possui uma conta? Entre!"
                ></RenderLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
};

export default SignUp;
