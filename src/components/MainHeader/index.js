import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  contactsHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0px 6px 6px 6px",
  },
}));

const MainHeader = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.contactsHeader}>{children}</div>;
};

export default MainHeader;
