import React, { useState } from "react";

import { Input, Box, Typography, IconButton } from "@mui/joy";
import Message from "../Message";
import useIsMobile from "../../hooks/isMobile";
import { Send } from "@mui/icons-material";
import loginIcon from "../../assets/toolbar.png";

function ChatBody() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([{}]);

  const isMobile = useIsMobile();

  console.log(chat);

  async function handleSubmit(e) {
    e.preventDefault();
    if (input.trim() !== "") {
      setChat([...chat, { message: `${input}`, isUser: true }]);

      setInput("");
    }
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        overflow: "hidden",
        pt: isMobile ? 7 : 0,
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowX: "hidden",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: 3,
          },
          scrollbarWidth: "thin",
          scrollbarColor: "#ccc transparent",
        }}
      >
        {chat.length === 1 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={loginIcon}
              width="250px"
              alt="Logo Icon"
              draggable="false"
            />
            <Typography level="h5">Não há mensagens para mostrar</Typography>
          </Box>
        ) : (
          chat.map((chat, index) => {
            if (index === 0) {
              return null;
            }
            return (
              <Message
                key={index}
                message={chat.message}
                isUser={chat.isUser}
              />
            );
          })
        )}
      </Box>
      <Box sx={{ px: 2, py: 1 }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            placeholder="Digite sua mensagem"
            size="lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            endDecorator={
              <IconButton
                disabled={!Boolean(input)}
                onClick={(e) => handleSubmit(e)}
              >
                <Send />
              </IconButton>
            }
            sx={{ mx: "auto", maxWidth: "1000px" }}
          />
        </form>
        <Typography level="body3" textAlign="center" sx={{ my: 1 }}>
          ChatBox is a project developed for educational purposes that aims to
          showcase how to create a chat application using modern web
          technologies.
        </Typography>
      </Box>
    </Box>
  );
}

export default ChatBody;
