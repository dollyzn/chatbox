import { Box, Typography, Button } from "@mui/joy";

import useIsMobile from "../../hooks/isMobile";
import TypeEffect from "../../components/TypeEffect";

import Ia from "../../assets/ia.png";

function Home() {
  const isMobile = useIsMobile();
  return (
    <Box sx={{ display: "flex", mt: 5 }}>
      <Box sx={{ maxWidth: "600px", minWidth: "600px", ml: "15%", mr: "10%" }}>
        <TypeEffect />
      </Box>

      {!isMobile && (
        <img
          src={Ia}
          style={{
            borderRadius: "500px",
            position: "fixed",
            marginLeft: "1000px",
          }}
          alt="AI"
          draggable="false"
        />
      )}
    </Box>
  );
}

export default Home;
