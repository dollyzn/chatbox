import React, { useContext, useState } from "react";
import { AuthContext } from "../context";
import { Link as RouterLink } from "react-router-dom";

import {
  Divider,
  List,
  Toolbar,
  Box,
  CssBaseline,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import {
  Avatar,
  IconButton,
  Button,
  Link,
  Typography,
  MenuList,
  MenuItem,
  ListItemDecorator,
} from "@mui/joy";
import { styled } from "@mui/material/styles";
import MainListItems from "./MainListItems";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import MuiAppBar from "@mui/material/AppBar";

import useIsMobile from "../hooks/isMobile";

import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Icon from "../assets/toolbar.png";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Popup = styled(PopperUnstyled)({
  zIndex: 1000,
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

function LoggedInLayout({ children }) {
  const isMobile = useIsMobile();
  const Query = useMediaQuery("(max-width:1400px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(!Query);

  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      setAnchorEl(null);
    } else if (event.key === "Escape") {
      anchorEl?.focus();
      setAnchorEl(null);
    }
  };

  const { SignOut, user } = useContext(AuthContext);

  function RenderLink(props) {
    const { to, src, width, alt } = props;

    const renderLink = React.useMemo(
      () =>
        React.forwardRef((itemProps, ref) => (
          <RouterLink to={to} ref={ref} {...itemProps} />
        )),
      [to]
    );

    return (
      <Link component={renderLink}>
        <img src={src} width={width} alt={alt} draggable="false" />
      </Link>
    );
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid #e0e0e0",
        }}
        position="fixed"
        open={open}
      >
        <Toolbar
          sx={{
            pr: "24px",
            pl: "-10px",
          }}
        >
          <IconButton
            edge="start"
            color="primary"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              display: open && isMobile ? "none" : "block",
            }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            startDecorator={
              <Avatar
                variant="plain"
                size="sm"
                alt="Avatar"
                color="soft"
                src={user?.providerData[0].photoURL}
              />
            }
            sx={{
              "--Button-gap": isMobile ? "0px" : "10px",
            }}
          >
            {!isMobile && (
              <Typography level="body1" color="white">
                {user?.providerData[0].displayName}
              </Typography>
            )}
          </Button>
          <Popup
            role={undefined}
            id="composition-menu"
            open={openMenu}
            anchorEl={anchorEl}
            disablePortal
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 4],
                },
              },
            ]}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                variant="outlined"
                onKeyDown={handleListKeyDown}
                sx={{ boxShadow: "md", bgcolor: "background.body" }}
              >
                <MenuItem onClick={SignOut}>
                  <ListItemDecorator>
                    <LogoutIcon />
                  </ListItemDecorator>
                  Logout
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Popup>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "white",
            px: [1],
          }}
        >
          <RenderLink to="/home" src={Icon} width="130px" alt="Logo Icon" />
          {isMobile && <Box flexGrow={1}></Box>}
          <IconButton
            edge="start"
            color="primary"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              display: isMobile ? "block" : "none",
            }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <Typography level="body3" sx={{ ml: 2, mt: 3, mb: 2 }}>
            Navegação
          </Typography>
          <MainListItems />
        </List>
      </Drawer>
      <Main
        open={open}
        sx={{
          backgroundColor: "#F5F5F5",
          flexGrow: 1,
          flex: 1,
          height: "100vh",
          overflow: "auto",
          pt: { sm: "56px", md: "64px" },
        }}
      >
        {children ? children : null}
      </Main>
    </Box>
  );
}

export default LoggedInLayout;
