import React from "react";

import { Input, Box, Typography } from "@mui/joy";
import Message from "../Message";

function ChatBody() {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: 3,
          },
          scrollbarWidth: "thin",
          scrollbarColor: "#ccc transparent",
        }}
      >
        <Message message="Olá, como posso ajudar?" isUser={false} />
        <Message message="Gostaria de fazer uma reserva." isUser={true} />
        <Message message="Olá, como posso ajudar?" isUser={false} />
        <Message message="Gostaria de fazer uma reserva." isUser={true} />
        <Message message="Olá, como posso ajudar?" isUser={false} />
        <Message message="Gostaria de fazer uma reserva." isUser={true} />
        <Message message="Olá, como posso ajudar?" isUser={false} />
        <Message message="Gostaria de fazer uma reserva." isUser={true} />
        <Message message="Olá, como posso ajudar?" isUser={false} />
        <Message message="Gostaria de fazer uma reserva." isUser={true} />
        <Message message="Olá, como posso ajudar?" isUser={false} />
        <Message message="Gostaria de fazer uma reserva." isUser={true} />
        <Message message="Olá, como posso ajudar?" isUser={false} />
        <Message message="Gostaria de fazer uma reserva." isUser={true} />
      </Box>
      <Box sx={{ px: 2, py: 1 }}>
        <Input
          placeholder="Digite sua mensagem"
          size="lg"
          sx={{ mx: "auto", width: "500px" }}
        />
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
