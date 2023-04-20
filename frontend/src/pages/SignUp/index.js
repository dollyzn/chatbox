import React, { useContext, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { auth, provider } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { motion, useDragControls } from "framer-motion";
import * as Yup from "yup";

import {
  Grid,
  Box,
  Container,
  IconButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Typography,
  Link,
  Sheet,
} from "@mui/joy";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import loginIcon from "../../assets/toolbar.png";

const SignUp = () => {
  const { SignUp, GoogleSign, signed, loginLoading } = useContext(AuthContext);
  const [formError, setFormError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const dragControls = useDragControls();

  function startDrag(event) {
    dragControls.start(event, { snapToCursor: false });
  }

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dragref = useRef(null);

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
    await GoogleSign(auth, provider);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    try {
      await signUpSchema.validate(values, { abortEarly: false });
      setFormError({});
      SignUp(
        data.get("name"),
        data.get("email"),
        data.get("password"),
        emailRef,
        passwordRef,
        setFormError
      );
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
      <Box
        sx={{
          height: "100vh",
          background: "linear-gradient(to top right, #10aae8, #4dc9ff)",
        }}
      >
        <Container
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          component="main"
          maxWidth="xs"
        >
          <Sheet
            sx={{
              mx: "auto",
              py: 5,
              px: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: "md",
              boxShadow: "3vmin 3vmin #57575712",
            }}
            variant="outlined"
          >
            <Box
              sx={{
                textAlign: "center",
              }}
              ref={dragref}
            >
              <motion.div
                drag
                dragConstraints={dragref}
                dragElastic={0.02}
                dragMomentum={false}
                dragControls={dragControls}
                onMouseEnter={startDrag}
                animate={{
                  y: [-2, 2, -2, 2, 0],
                  scale: [1, 1.05, 1, 1.05, 1],
                  transition: { duration: 2, ease: "easeInOut" },
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#2dbefd",
                    backgroundImage: `url(${loginIcon})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    borderRadius: "lg",
                    boxShadow: "lg",
                    minHeight: "119px",
                  }}
                ></Box>
              </motion.div>
            </Box>
            <Box>
              <Box sx={{ mt: 2, mb: 4 }}>
                <Typography level="h3" component="h1">
                  <b>Bem-vindo!</b>
                </Typography>
                <Typography level="body2">
                  Cadastre-se para continuar.
                </Typography>
              </Box>
              <Box component="form" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel
                        sx={{ color: formError.name ? "#d3232f" : "" }}
                      >
                        Nome
                      </FormLabel>
                      <Input
                        fullWidth
                        size="lg"
                        id="name"
                        name="name"
                        autoComplete="given-name"
                        placeholder="Natã Santos"
                        error={Boolean(formError.name)}
                        autoFocus
                      />
                      <FormHelperText sx={{ color: "#d3232f" }}>
                        {formError.name ? formError.name : ""}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel
                        sx={{ color: formError.email ? "#d3232f" : "" }}
                      >
                        Email
                      </FormLabel>
                      <Input
                        fullWidth
                        ref={emailRef}
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
                        ref={passwordRef}
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
                  loading={loginLoading}
                  type="submit"
                  fullWidth
                  variant="solid"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Cadastrar
                </Button>
                <Button
                  loading={loginLoading}
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
                      to="/login"
                      level="body2"
                      underline="hover"
                      text="Já possui uma conta? Entre!"
                    ></RenderLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Sheet>
        </Container>
      </Box>
    );
  }
};

export default SignUp;
