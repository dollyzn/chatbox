import * as React from "react";
import {
  ListItemContent,
  ListItemDecorator,
  ListItemButton,
  ListItem,
  List,
} from "@mui/joy";
import { SvgIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { ReactComponent as IconGPT } from "../assets/gpt.svg";
import { ReactComponent as IconDialogFlow } from "../assets/dialogflow.svg";
import { Link as RouterLink } from "react-router-dom";

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
    <List>
      <ListItem>
        <ListItemButton component={renderLink} className={className}>
          {icon ? <ListItemDecorator>{icon}</ListItemDecorator> : null}
          <ListItemContent>{primary}</ListItemContent>
        </ListItemButton>
      </ListItem>
    </List>
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
