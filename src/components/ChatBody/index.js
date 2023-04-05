import React from "react";

import { Input, Box, Typography } from "@mui/joy";
import Message from "../Message";
import useIsMobile from "../../hooks/isMobile";

function ChatBody() {
  const isMobile = useIsMobile();

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
        <Message message="Olá, como posso ajudar?" isUser={false} />
        <Message
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin cursus erat vel felis hendrerit iaculis. Sed eu nulla id enim luctus iaculis et a risus. Morbi a lectus turpis. Ut consequat, tortor sed hendrerit porttitor, nisl nibh tristique orci, vel pharetra nisl lorem at lorem. Etiam consequat fermentum imperdiet. Integer vitae nulla posuere, vestibulum est pulvinar, facilisis ante. Mauris porta neque in purus dictum varius. Maecenas quis bibendum purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam euismod, nibh quis lacinia suscipit, nibh sapien iaculis est, nec sagittis ligula dui eget elit."
          isUser={true}
        />
        <Message
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin cursus erat vel felis hendrerit iaculis. Sed eu nulla id enim luctus iaculis et a risus. Morbi a lectus turpis. Ut consequat, tortor sed hendrerit porttitor, nisl nibh tristique orci, vel pharetra nisl lorem at lorem. Etiam consequat fermentum imperdiet. Integer vitae nulla posuere, vestibulum est pulvinar, facilisis ante. Mauris porta neque in purus dictum varius. Maecenas quis bibendum purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam euismod, nibh quis lacinia suscipit,"
          isUser={false}
        />
        <Message
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin cursus erat vel felis hendrerit iaculis. Sed eu nulla id enim luctus iaculis et a risus. Morbi a lectus turpis. Ut consequat, tortor sed hendrerit porttitor, nisl nibh tristique orci, vel pharetra nisl lorem at lorem. Etiam consequat fermentum imperdiet. Integer vitae nulla posuere, vestibulum est pulvinar, facilisis ante. Mauris porta neque in purus dictum varius. Maecenas quis bibendum purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam euismod, nibh quis lacinia suscipit, nibh sapien iaculis est, nec sagittis ligula dui eget elit."
          isUser={true}
        />
        <Message
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin cursus erat vel felis hendrerit iaculis. Sed eu nulla id enim luctus iaculis et a risus. Morbi a lectus turpis. Ut consequat, tortor sed hendrerit porttitor, nisl nibh tristique orci, vel pharetra nisl lorem at lorem. Etiam consequat fermentum imperdiet. Integer vitae nulla posuere, vestibulum est pulvinar, facilisis ante. Mauris porta neque in purus dictum varius. Maecenas quis bibendum purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam euismod, nibh quis lacinia suscipit,"
          isUser={false}
        />{" "}
        <Message
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin cursus erat vel felis hendrerit iaculis. Sed eu nulla id enim luctus iaculis et a risus. Morbi a lectus turpis. Ut consequat, tortor sed hendrerit porttitor, nisl nibh tristique orci, vel pharetra nisl lorem at lorem. Etiam consequat fermentum imperdiet. Integer vitae nulla posuere, vestibulum est pulvinar, facilisis ante. Mauris porta neque in purus dictum varius. Maecenas quis bibendum purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam euismod, nibh quis lacinia suscipit, nibh sapien iaculis est, nec sagittis ligula dui eget elit."
          isUser={true}
        />
        <Message
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin cursus erat vel felis hendrerit iaculis. Sed eu nulla id enim luctus iaculis et a risus. Morbi a lectus turpis. Ut consequat, tortor sed hendrerit porttitor, nisl nibh tristique orci, vel pharetra nisl lorem at lorem. Etiam consequat fermentum imperdiet. Integer vitae nulla posuere, vestibulum est pulvinar, facilisis ante. Mauris porta neque in purus dictum varius. Maecenas quis bibendum purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam euismod, nibh quis lacinia suscipit,"
          isUser={false}
        />
      </Box>
      <Box sx={{ px: 2, py: 1 }}>
        <Input
          placeholder="Digite sua mensagem"
          size="lg"
          sx={{ mx: "auto", maxWidth: "1000px" }}
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
