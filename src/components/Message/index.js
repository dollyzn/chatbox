import React from "react";
import { Avatar, Box } from "@mui/material";
import { Divider, Typography } from "@mui/joy";
import useIsMobile from "../../hooks/isMobile";

const Message = ({ message, isUser }) => {
  const messageStyle = isUser ? userMessageStyle : botMessageStyle;
  const containerStyle = isUser ? userContainerStyle : botContainerStyle;

  const isMobile = useIsMobile();

  return (
    <>
      <Box sx={containerStyle}>
        <Box
          sx={{
            display: "flex",
            my: 2,
            ml: isMobile ? 3 : "20%",
            justifyContent: "start",
          }}
        >
          <Avatar alt="Avatar" src="https://via.placeholder.com/100" />
          <Box sx={{ ...messageContainerStyle, ...messageStyle }}>
            <Typography level="body2">{message}</Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

const userContainerStyle = {
  backgroundColor: "#f5f5f5",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const botContainerStyle = {
  backgroundColor: "#ddf1ff",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const messageContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  mx: 5,
  padding: 1,
};

const userMessageStyle = {
  maxWidth: "480px",
  color: "black",
};

const botMessageStyle = {
  maxWidth: "480px",
  color: "black",
};

export default Message;
