import { margin } from "@mui/system";
import { motion } from "framer-motion";
import { Container } from "@mui/system";
import { useState } from "react";

function ChatsManager() {
  const [pos, setPos] = useState();
  const [posy, setPosy] = useState();
  const { innerWidth: width, innerHeight: height } = window;
  return (
    <Container sx={{ mt: 10 }}>
      <motion.div
        className="container"
        whileHover={{}}
        animate={{
          x: pos,
          y: posy,
          borderRadius: "30px",
        }}
        transition={{ delay: 0, duration: 0 }}
        onMouseEnter={() => {
          console.log(
            Math.floor(Math.random(window.innerWidth) * 500),
            Math.floor(Math.random(window.innerWidth) * 500)
          );
          setPos(Math.floor(Math.random(window.innerWidth) * 500));
          setPosy(Math.floor(Math.random(window.innerWidth) * 500));
        }}
      >
        Enviar
      </motion.div>
    </Container>
  );
}

export default ChatsManager;
