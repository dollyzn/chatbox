import { Box, Typography } from "@mui/joy";

import useIsMobile from "../../hooks/isMobile";
import TypeEffect from "../../components/TypeEffect";

import Ia from "../../assets/ia.png";

function Home() {
  const isMobile = useIsMobile();
  return (
    <Box sx={{ display: "flex", mt: 5 }}>
      <Typography level="h3" sx={{ maxWidth: "600px", ml: "15%", mr: "10%" }}>
        A inteligência artificial é a chave para
        <TypeEffect />
      </Typography>

      {!isMobile && (
        <img
          src={Ia}
          style={{
            borderRadius: "500px",
            position: "fixed",
            marginLeft: "1000px",
          }}
          draggable="false"
        />
      )}
    </Box>
  );
}

export default Home;
