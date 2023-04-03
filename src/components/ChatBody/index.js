import React, { useState, useEffect } from "react";

import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Stack } from "@mui/joy";

import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

// Componente para exibir uma mensagem do chat
function Message(props) {
  const { type, avatarUrl, username, timestamp, body } = props;

  const messageBubbleStyles = {
    borderRadius: 16,
    maxWidth: "80%",
    padding: 16,
  };

  const messageRowStyles = {
    display: "flex",
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: type === "outgoing" ? "flex-end" : "flex-start",
  };

  const messageAvatarStyles = {
    width: 32,
    height: 32,
    marginRight: 8,
    alignSelf: "center",
  };

  return (
    <Box sx={messageRowStyles}>
      <Avatar src={avatarUrl} sx={messageAvatarStyles} />
      <Box
        sx={messageBubbleStyles}
        bgcolor={type === "outgoing" ? "primary.main" : "background.paper"}
      >
        <Typography
          variant="body1"
          sx={{ color: type === "outgoing" ? "common.white" : "text.primary" }}
        >
          {body}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: type === "outgoing" ? "common.white" : "text.secondary",
          }}
        >
          {username}
        </Typography>
      </Box>
    </Box>
  );
}

// ComponentBe para exibir o chat completo
function ChatBody(props) {
  const [message, setMessage] = useState();
  const [chat, setChat] = useState([]);

  const messageRef = collection(db, "messages");

  const getMessages = async () => {
    const res = await getDocs(messageRef);
    if (res) {
      setChat(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  };

  console.log(chat);

  const ongoingMessages = chat
    .filter((message) => message.type === "ongoing")
    .map((message) => (
      <Message
        type="ongoing"
        avatarUrl={message.photoURL}
        body={message.text}
      />
    ));

  const outgoingMessages = chat
    .filter((message) => message.type === "outgoing")
    .map((message) => (
      <Message
        key={message.id}
        type="outgoing"
        avatarUrl={message.avatarUrl}
        username={message.username}
        timestamp={message.timestamp}
        body={message.text}
      />
    ));

  return (
    <Box sx={{ flexGrow: 1, height: "90vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack>{ongoingMessages}</Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack>{outgoingMessages}</Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChatBody;
