import React, { useContext } from "react";
import { Divider, Typography, Avatar, Box } from "@mui/joy";
import useIsMobile from "../../hooks/isMobile";
import { AuthContext } from "../../context";

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
            size="sm"
            src={
              isUser
                ? user?.photoURL
                : "https://image.winudf.com/v2/image1/ZGV2X2ltYWdlXzE4MjcwOTUzXzE2MzU1OV8yMDIyMTIyMzA5MDYwNTA3NQ/icon.png?fakeurl=1&h=240&type=webp"
            }
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
            <Typography level="body1">{message}</Typography>
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
  wordBreak: "break-word",
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
