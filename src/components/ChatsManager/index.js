import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import DialogFlowIcon from "../../assets/flow.png";
import ChatGPTIcon from "../../assets/gpt.png";

function ChatsManager() {
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      height="90vh"
      columnSpacing="200px"
    >
      <Grid item>
        <img src={ChatGPTIcon} width="400px" alt="gpt icon" />
      </Grid>
      <Grid item>
        <img src={DialogFlowIcon} width="330px" alt="dialogflow icon" />
      </Grid>
    </Grid>
  );
}

export default ChatsManager;
