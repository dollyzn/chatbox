import React from "react";

import { Input, Box, Typography } from "@mui/joy";

function ChatBody() {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        {/* Conteúdo do chat aqui */}
      </Box>
      <Box sx={{ px: 2, py: 1 }}>
        <Input placeholder="Digite sua mensagem" fullWidth size="lg" />
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
