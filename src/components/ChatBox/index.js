import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export const ChatBox = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("message"));
    sendMessage(data.get("message"));
    // Login(data.get("email"), data.get("password"));
  };

  async function sendMessage(message) {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        text: message,
        photoURL: "Lovelace",
        uid: "teste",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        bgcolor: "cyan",
        minHeight: "80vh",
        display: "flex",
        alignItems: "end",
        flexWrap: "wrap",
        justifyContent: "flex-start",
      }}
    >
      <TextField
        name="message"
        label="Mensagem"
        id="message"
        sx={{ width: "700px" }}
      />
      <Button type="submit" variant="contained">
        Enviar
      </Button>
    </Box>
  );
};
