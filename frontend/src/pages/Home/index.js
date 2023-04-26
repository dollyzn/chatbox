import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  AspectRatio,
  IconButton,
  SvgIcon,
  Divider,
  Badge,
  Grid,
  Container,
  Button,
} from "@mui/joy";

import { motion } from "framer-motion";

import { AuthContext } from "../../context/AuthContext";

import useIsMobile from "../../hooks/isMobile";
import TypeEffect from "../../components/TypingHomeEffect";

import { ReactComponent as IconGPT } from "../../assets/gpt.svg";
import { ReactComponent as IconDialogFlow } from "../../assets/dialogflow.svg";
import dash from "../../assets/dash.png";
import people from "../../assets/people.png";
import nodelogo from "../../assets/node-js.svg";
import reactlogo from "../../assets/react.svg";
import dialogflowlogo from "../../assets/dialogflowlogo.svg";
import openailogo from "../../assets/openai.png";
import oraclelogo from "../../assets/oracle.svg";
import firebaselogo from "../../assets/firebase.png";
import nginxlogo from "../../assets/nginx.svg";
import pm2logo from "../../assets/pm2.svg";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);
  const [showCard, setShowCard] = useState(false);
  const isMobile = useIsMobile();

  const cardVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 30 },
  };

  const firstName = user?.name.split(" ")[0];

  function RenderLink(props) {
    const { to, variant, size, text, styles } = props;

    const renderLink = React.useMemo(
      () =>
        React.forwardRef((itemProps, ref) => (
          <RouterLink to={to} ref={ref} {...itemProps} />
        )),
      [to]
    );

    return (
      <Button component={renderLink} variant={variant} size={size} sx={styles}>
        {text}
      </Button>
    );
  }

  return (
    <Container sx={{ mt: 10 }}>
      <Grid
        container
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          mx: "auto",
        }}
      >
        <Grid
          lg={6}
          md={6}
          sm={12}
          sx={{
            order: { xs: 2, sm: 1 },
            textAlign: { xs: "center", md: "start" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: { xs: "center", md: "start" },
            }}
          >
            <img
              src={dash}
              width={150}
              style={{ display: isMobile ? "none" : "block" }}
            />
            <Typography level="display1">ChatBox</Typography>
          </Box>
          <TypeEffect />
          <RenderLink
            to="/chat/chatgpt"
            variant="solid"
            text={
              <Typography level="h5" sx={{ color: "#fff", p: 1 }}>
                Teste agora!
              </Typography>
            }
            styles={{ mt: 10, px: 5 }}
          />
        </Grid>
        <Grid
          lg={6}
          md={6}
          sm={12}
          sx={{ order: { md: 1 }, textAlign: "center" }}
        >
          <img
            src={people}
            style={{
              borderRadius: 50,
              width: "100%",
              maxWidth: "600px",
            }}
          />
        </Grid>
      </Grid>
      <Typography level="h6" sx={{ textAlign: "center", mt: 12 }}>
        Este projeto só foi possível graças a essas empresas e tecnologias.
      </Typography>
      <Grid
        container
        spacing={5}
        justifyContent="space-evenly"
        alignItems="center"
        sx={{ flexGrow: 1, mt: { xs: 10, sm: 0 } }}
      >
        <Grid item xs={5} sm={1}>
          <img src={nodelogo} width={100} />
        </Grid>
        <Grid item xs={5} sm={1}>
          <img src={reactlogo} width={70} />
        </Grid>
        <Grid item xs={5} sm={1}>
          <img src={pm2logo} width={100} />
        </Grid>
        <Grid item xs={5} sm={1}>
          <img src={openailogo} width={100} />
        </Grid>
        <Grid item xs={5} sm={1}>
          <img src={dialogflowlogo} width={100} />
        </Grid>
        <Grid item xs={5} sm={1}>
          <img src={firebaselogo} width={100} />
        </Grid>
        <Grid item xs={5} sm={1}>
          <img src={oraclelogo} width={100} />
        </Grid>
        <Grid item xs={5} sm={1}>
          <img src={nginxlogo} width={70} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
