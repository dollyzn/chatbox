import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Link,
  Chip,
  AspectRatio,
  IconButton,
  SvgIcon,
  Divider,
  Badge,
} from "@mui/joy";

import { motion } from "framer-motion";

import { AuthContext } from "../../context";

import useIsMobile from "../../hooks/isMobile";
import TypeEffect from "../../components/TypeEffect";

import { ReactComponent as IconGPT } from "../../assets/gpt.svg";
import { ReactComponent as IconDialogFlow } from "../../assets/dialogflow.svg";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Ia from "../../assets/ia.png";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);
  const [showCard, setShowCard] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  const iconVariants = {
    down: { y: -150, transition: { duration: 0.5 } },
    up: { y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 30 },
  };

  const firstName = user?.displayName.split(" ")[0];

  function RenderLink(props) {
    const { to, variant, size, icon } = props;

    const renderLink = React.useMemo(
      () =>
        React.forwardRef((itemProps, ref) => (
          <RouterLink to={to} ref={ref} {...itemProps} />
        )),
      [to]
    );

    return (
      <IconButton component={renderLink} variant={variant} size={size}>
        {icon}
      </IconButton>
    );
  }

  return (
    <Box sx={{ display: "flex", mt: 5 }}>
      <Box sx={{ maxWidth: "600px", minWidth: "40%", ml: "15%", mr: "15%" }}>
        <Card
          variant="outlined"
          sx={{ maxWidth: 600, minHeight: "85vh", height: "100%", zIndex: 1 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography level="h1" sx={{ mr: 5 }}>
              {isMobile ? "Olá!" : `Olá! ${firstName}.`}
            </Typography>
            <div style={{ display: "flex", gap: 15 }}>
              <Badge badgeContent="!">
                <RenderLink
                  variant="outlined"
                  to="/chat"
                  icon={<SvgIcon component={IconGPT} inheritViewBox></SvgIcon>}
                  size="lg"
                  fullWidth
                ></RenderLink>
              </Badge>
              <Badge badgeContent="!">
                <RenderLink
                  variant="outlined"
                  to="/chat"
                  icon={
                    <SvgIcon
                      component={IconDialogFlow}
                      inheritViewBox
                    ></SvgIcon>
                  }
                  size="lg"
                  fullWidth
                ></RenderLink>
              </Badge>
            </div>
          </Box>
          <Divider sx={{ mt: 2, mb: 3 }} />
          <TypeEffect />
          {/* <IconButton
            aria-label="Show card"
            variant="plain"
            onClick={() => {
              setShowCard(!showCard);
              setHovered(!hovered);
            }}
          >
            <ExpandLessIcon />
          </IconButton>
          <motion.div
            initial={{ y: 0 }}
            animate={hovered ? "down" : "up"}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 10,
              yoyo: Infinity,
            }}
            variants={iconVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: "absolute",
              bottom: 20,
              left: "49%",
            }}
          ></motion.div> */}
        </Card>
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
      {!isMobile && (
        <motion.div
          initial="hidden"
          animate={showCard ? "hidden" : "visible"}
          variants={cardVariants}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            bottom: 20,
            right: 30,
            width: "300px",
          }}
        >
          <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
              gap: 2,
              "&:hover": {
                boxShadow: "md",
                borderColor: "neutral.outlinedHoverBorder",
              },
              mb: 1,
            }}
            onClick={() => setShowCard(!showCard)}
          >
            <AspectRatio ratio="1" sx={{ width: 45 }}>
              <img
                src="https://avatars.githubusercontent.com/u/66445721?v=4"
                srcSet="https://avatars.githubusercontent.com/u/66445721?v=4"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
            <div>
              <Typography
                level="h2"
                fontSize="lg"
                id="card-description"
                mb={0.5}
              >
                Natã Santos
              </Typography>
              <Typography fontSize="sm" aria-describedby="card-description">
                Técnico Informática - IFF
              </Typography>
            </div>
          </Card>
          <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
              gap: 2,
              "&:hover": {
                boxShadow: "md",
                borderColor: "neutral.outlinedHoverBorder",
              },
            }}
          >
            <AspectRatio ratio="1" sx={{ width: 45 }}>
              <img
                src="https://avatars.githubusercontent.com/u/66445721?v=4"
                srcSet="https://avatars.githubusercontent.com/u/66445721?v=4"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
            <div>
              <Typography
                level="h2"
                fontSize="lg"
                id="card-description"
                mb={0.5}
              >
                Gabrielly Chaim
              </Typography>
              <Typography fontSize="sm" aria-describedby="card-description">
                Técnico Informática - IFF
              </Typography>
            </div>
          </Card>
        </motion.div>
      )}
    </Box>
  );
}

export default Home;
