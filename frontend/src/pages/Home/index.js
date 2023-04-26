import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { Box, Typography, Grid, Container, Button } from "@mui/joy";

import useIsMobile from "../../hooks/isMobile";
import TypeEffect from "../../components/TypingHomeEffect";

import people from "../../assets/webp/people.webp";
import nodelogo from "../../assets/svg/node-js.svg";
import reactlogo from "../../assets/svg/react.svg";
import chatboxlogo from "../../assets/webp/logo.webp";
import dialogflowlogo from "../../assets/svg/dialogflowlogo.svg";
import firebaselogo from "../../assets/webp/firebase.webp";
import openailogo from "../../assets/webp/openai.webp";
import oraclelogo from "../../assets/svg/oracle.svg";
import nginxlogo from "../../assets/svg/nginx.svg";
import pm2logo from "../../assets/svg/pm2.svg";

function Home() {
  const isMobile = useIsMobile();

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
              alt="Chatbox logo"
              src={chatboxlogo}
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
            alt="People chating ilustration"
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
        <Grid item xs={5} sm={3} md={1}>
          <img alt="Node logo" src={nodelogo} width={100} />
        </Grid>
        <Grid item xs={5} sm={3} md={1}>
          <img alt="React logo" src={reactlogo} width={70} />
        </Grid>
        <Grid item xs={5} sm={3} md={1}>
          <img alt="PM2 logo" src={pm2logo} width={100} />
        </Grid>
        <Grid item xs={5} sm={3} md={1}>
          <img alt="Openai logo" src={openailogo} width={100} />
        </Grid>
        <Grid item xs={5} sm={3} md={1}>
          <img alt="Dialogflow logo" src={dialogflowlogo} width={100} />
        </Grid>
        <Grid item xs={5} sm={3} md={1}>
          <img alt="Firebase logo" src={firebaselogo} width={100} />
        </Grid>
        <Grid item xs={5} sm={3} md={1}>
          <img alt="Oracle logo" src={oraclelogo} width={100} />
        </Grid>
        <Grid item xs={5} sm={3} md={1}>
          <img alt="Nginx logo" src={nginxlogo} width={70} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
