import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    flex: 1,
    padding: 0,
    height: "100%",
  },
  contentWrapper: {
    height: "100%",
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column",
  },
}));

const MainContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <Container classes={{ root: classes.mainContainer }} maxWidth={false}>
      <div className={classes.contentWrapper}>{children}</div>
    </Container>
  );
};

export default MainContainer;
