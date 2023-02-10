import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Navigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import loginIcon from "../../assets/icon.png";
import { useContext } from "react";
import { AuthContext } from "../../context";

const theme = createTheme();

provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

const Login = () => {
  const { Login, signed } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    Login(data.get("email"), data.get("password"));
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
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
                onClick={() => signInWithPopup(auth, provider)}
                startIcon={<GoogleIcon />}
              >
                Entrar com o Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/signup" variant="body2">
                    Não tem uma conta? Cadastre-se!
                  </Link>
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
