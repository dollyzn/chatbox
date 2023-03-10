import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  mainHeaderButtonsWrapper: {
    flex: "none",
    marginLeft: "auto",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const MainHeaderButtonsWrapper = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.mainHeaderButtonsWrapper}>{children}</div>;
};

export default MainHeaderButtonsWrapper;
