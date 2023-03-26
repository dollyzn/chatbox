import { Paper, Grid, Container } from "@mui/material";

import Chart from "../../components/Chart";
import Deposits from "../../components/Deposits";
import Orders from "../../components/Orders";
import TypeEffect from "../../components/TypeEffect";
import Ia from "../../assets/ia.png";
import { borderRadius } from "@mui/system";
import { Typography } from "@mui/joy";
import useIsMobile from "../../hooks/isMobile";

function Home() {
  const isMobile = useIsMobile();
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, boxSizing: "border-box" }}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={6}>
          <Typography level="h3">
            A inteligência artificial é a chave para
            <TypeEffect />
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          {!isMobile && (
            <img src={Ia} style={{ borderRadius: "50%", position: "static" }} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
