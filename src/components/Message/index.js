import React from "react";
import { Avatar, Box } from "@mui/material";
import { Typography } from "@mui/joy";

const Message = ({ message, isUser }) => {
  const messageStyle = isUser ? userMessageStyle : botMessageStyle;

  return (
    <Box sx={containerStyle}>
      <Avatar alt="Avatar" src="https://via.placeholder.com/50" />
      <Box sx={{ ...messageContainerStyle, ...messageStyle }}>
        <Typography level="body2">{message}</Typography>
      </Box>
    </Box>
  );
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: 1,
};

const messageContainerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  maxWidth: "80%",
  borderRadius: 16,
  padding: 1,
};

const userMessageStyle = {
  backgroundColor: "#e8f0fe",
  color: "black",
};

const botMessageStyle = {
  backgroundColor: "#f5f5f5",
  color: "black",
};

export default Message;
