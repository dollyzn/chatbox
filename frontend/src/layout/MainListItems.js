import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { SvgIcon } from "@mui/material";
import {
  ListItemContent,
  ListItemDecorator,
  ListItemButton,
  ListItem,
} from "@mui/joy";

import HomeIcon from "@mui/icons-material/Home";
import { ReactComponent as IconGPT } from "../assets/svg/gpt.svg";
import { ReactComponent as IconDialogFlow } from "../assets/svg/dialogflow.svg";

function ListItemLink(props) {
  const { icon, primary, to, className } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem>
      <ListItemButton component={renderLink} className={className}>
        {icon ? <ListItemDecorator>{icon}</ListItemDecorator> : null}
        <ListItemContent>{primary}</ListItemContent>
      </ListItemButton>
    </ListItem>
  );
}

function MainListItems() {
  return (
    <React.Fragment>
      <ListItemLink to="/home" primary="Home" icon={<HomeIcon />} />
      <ListItemLink
        to="/chat/chatgpt"
        primary="ChatGPT"
        icon={<SvgIcon component={IconGPT} inheritViewBox></SvgIcon>}
      />
      <ListItemLink
        to="/chat/dialogflow"
        primary="Dialogflow"
        icon={<SvgIcon component={IconDialogFlow} inheritViewBox></SvgIcon>}
      />
    </React.Fragment>
  );
}

export default MainListItems;
