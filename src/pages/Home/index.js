import React from "react";
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
} from "@mui/joy";

import { AuthContext } from "../../context";

import useIsMobile from "../../hooks/isMobile";
import TypeEffect from "../../components/TypeEffect";

import { ReactComponent as IconGPT } from "../../assets/gpt.svg";
import { ReactComponent as IconDialogFlow } from "../../assets/dialogflow.svg";
import Ia from "../../assets/ia.png";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);
  const isMobile = useIsMobile();

  const firstName = user?.displayName.split(" ")[0];

  function RenderLink(props) {
    const { to, variant, size, icon, fullWidth } = props;

    const renderLink = React.useMemo(
      () =>
        React.forwardRef((itemProps, ref) => (
          <RouterLink to={to} ref={ref} {...itemProps} />
        )),
      [to]
    );

    return (
      <IconButton
        component={renderLink}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
      >
        {icon}
      </IconButton>
    );
  }

  return (
    <Box sx={{ display: "flex", mt: 5 }}>
      <Box sx={{ maxWidth: "600px", minWidth: "40%", ml: "15%", mr: "10%" }}>
        <Card
          variant="outlined"
          sx={{ maxWidth: 600, height: "85vh", zIndex: 1 }}
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
              <RenderLink
                variant="outlined"
                to="/chat"
                icon={<SvgIcon component={IconGPT} inheritViewBox></SvgIcon>}
                size="lg"
                fullWidth
              ></RenderLink>
              <RenderLink
                variant="outlined"
                to="/chat"
                icon={
                  <SvgIcon component={IconDialogFlow} inheritViewBox></SvgIcon>
                }
                size="lg"
                fullWidth
              ></RenderLink>
            </div>
          </Box>
          <Divider sx={{ mt: 2, mb: 3 }} />
          <TypeEffect />
          <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
              position: "absolute",
              bottom: 20,
              left: "auto",
              right: "auto",
              width: "calc(100% - 31px)",
              gap: 2,
              "&:hover": {
                boxShadow: "md",
                borderColor: "neutral.outlinedHoverBorder",
              },
            }}
          >
            <AspectRatio ratio="1" sx={{ width: 90 }}>
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
              <Typography
                fontSize="sm"
                aria-describedby="card-description"
                mb={1}
              >
                <Link
                  overlay
                  underline="none"
                  href="https://github.com/dollyzn"
                  sx={{ color: "text.tertiary" }}
                  rel="noopener"
                  target="_blank"
                >
                  Técnico Informática - IFF
                </Link>
              </Typography>
              <Chip
                variant="outlined"
                color="primary"
                size="sm"
                sx={{ pointerEvents: "none" }}
              >
                Code, coffee, repeat.
              </Chip>
            </div>
          </Card>
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
    </Box>
  );
}

export default Home;
