import { motion } from "framer-motion";
import styled from "styled-components";

const Background = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #0269c2, #00bcd4);
  opacity: 0.8;
`;

const Waves = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(-50%);
  background: url("https://cdn.pixabay.com/photo/2017/06/24/23/41/abstract-2431286_1280.png")
    repeat-x;
`;

export default function WaveAnimation() {
  return (
    <Background
      initial={{ scaleX: 1.2, scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Waves
        initial={{ y: "-30%" }}
        animate={{ y: "-10%" }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror" }}
      />
    </Background>
  );
}
