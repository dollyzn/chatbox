import React, { useContext } from "react";
import { Divider, Typography, Avatar, Box } from "@mui/joy";
import useIsMobile from "../../hooks/isMobile";
import { AuthContext } from "../../context/AuthContext";

import botIcon from "../../assets/bot2.jpg";

const Message = ({ message, isUser }) => {
  const { user } = useContext(AuthContext);
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
          <Avatar
            alt="Avatar"
            size="md"
            src={isUser ? user?.photoURL : botIcon}
            sx={{
              mt: 1,
            }}
          />
          <Box
            sx={{
              ...messageContainerStyle,
              ...messageStyle,
            }}
          >
            <Typography level="body1" sx={{ whiteSpace: "pre-line" }}>
              {message}
            </Typography>
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
  backgroundColor: "#addbff",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const messageContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  mx: 5,
  padding: 1,
  wordBreak: "break-word",
};

const userMessageStyle = {
  maxWidth: "700px",
};

const botMessageStyle = {
  maxWidth: "700px",
};

export default Message;
