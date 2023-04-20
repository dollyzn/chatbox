import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography, IconButton, Textarea, Divider } from "@mui/joy";
import Message from "../Message";
import useIsMobile from "../../hooks/isMobile";
import { Send } from "@mui/icons-material";
import loginIcon from "../../assets/toolbar.png";
import TypingMessage from "../TypingMessageEffect";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

function ChatBody() {
  const { user } = useContext(AuthContext);
  const { type } = useParams();
  const messagesRef = useRef(null);
  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [chat, setChat] = useState([{}]);

  const typingSpeed = 30;

  const isMobile = useIsMobile();

  useEffect(() => {
    handleScroll();
  }, [chat]);

  function handleScroll() {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let message;
    switch (type) {
      case "chatgpt":
        if (input.trim() !== "") {
          let newChat = [...chat, { message: `${input}`, isUser: true }];
          setChat(newChat);
          setDisabled(true);
          setInput("");

          try {
            const response = await api.post("/chatgpt", {
              token: user.token,
              queryText: input,
            });

            message = response.data.data.content;
          } catch (error) {
            console.error(error);
            message =
              "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.";
          }

          console.log(message);
          const botMessage = { message: `${message}`, isUser: false };
          setChat([
            ...newChat,
            {
              message: (
                <TypingMessage
                  message={botMessage.message}
                  typingSpeed={typingSpeed}
                />
              ),
              isUser: false,
            },
          ]);
          setTimeout(() => {
            setChat([...newChat, botMessage]);
            handleScroll();
            setDisabled(false);
          }, botMessage.message.length * typingSpeed);
        }
        break;
      case "dialogflow":
        if (input.trim() !== "") {
          let newChat = [...chat, { message: `${input}`, isUser: true }];
          setChat(newChat);
          setDisabled(true);
          setInput("");

          try {
            const response = await api.post("/dialogflow", {
              token: user.token,
              languageCode: "pt-BR",
              queryText: input,
              sessionId: `${user?.uid}`,
            });

            message = response.data.data.response;
          } catch (error) {
            console.error(error);
            message =
              "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.";
          }

          const botMessage = {
            message: `${message}`,
            isUser: false,
          };
          setChat([
            ...newChat,
            {
              message: (
                <TypingMessage
                  message={botMessage.message}
                  typingSpeed={typingSpeed}
                />
              ),
              isUser: false,
            },
          ]);
          setTimeout(() => {
            setChat([...newChat, botMessage]);
            handleScroll();
            setDisabled(false);
          }, botMessage.message.length * typingSpeed);
        }
        break;
      default:
        if (input.trim() !== "") {
          let newChat = [...chat, { message: `${input}`, isUser: true }];
          setChat(newChat);
          setDisabled(true);
          setInput("");

          const botMessage = {
            message:
              "🤔 A sua URL está com algum parâmetro não reconhecido. Para continuar selecione novamente o tipo de chat desejado.",
            isUser: false,
          };
          setChat([
            ...newChat,
            {
              message: (
                <TypingMessage
                  message={botMessage.message}
                  typingSpeed={typingSpeed}
                />
              ),
              isUser: false,
            },
          ]);
          setTimeout(() => {
            setChat([...newChat, botMessage]);
            handleScroll();
            setDisabled(false);
          }, botMessage.message.length * typingSpeed);
        }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

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
          scrollBehavior: "smooth",
        }}
        ref={messagesRef}
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
      <Divider />
      <Box sx={{ px: 2, py: 1 }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Textarea
            placeholder="Digite sua mensagem"
            size="lg"
            value={input}
            disabled={disabled}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            endDecorator={
              <IconButton
                disabled={!Boolean(input)}
                onClick={(e) => handleSubmit(e)}
                sx={{ position: "absolute", right: 5, bottom: 10 }}
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
