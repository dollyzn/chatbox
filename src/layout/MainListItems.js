import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssistantIcon from "@mui/icons-material/Assistant";
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
    <li>
      <ListItemButton component={renderLink} className={className}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItemButton>
    </li>
  );
}

function MainListItems() {
  return (
    <React.Fragment>
      <ListItemLink to="/home" primary="Dashboard" icon={<DashboardIcon />} />
      <ListItemLink to="/chat" primary="Chat" icon={<AssistantIcon />} />
    </React.Fragment>
  );
}

export default MainListItems;
