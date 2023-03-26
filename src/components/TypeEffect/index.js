import React, { useState, useEffect } from "react";
import { Typography } from "@mui/joy";
import "../../App.css";

const phrases = [
  "oferecer uma experiência de chatbot aprimorada e mais humana.",
  "permitir que o chatbot responda às perguntas com mais rapidez e precisão.",
  "personalizar a experiência do usuário, oferecendo soluções sob medida.",
  "entender melhor as necessidades dos usuários e fornecer soluções mais eficazes.",
  "automatizar tarefas repetitivas, permitindo que as equipes se concentrem em projetos mais complexos.",
  "aumentar a eficiência do atendimento ao cliente, reduzindo o tempo de espera.",
  "aprimorar o reconhecimento de voz e processamento de linguagem natural para melhor interação.",
  "tornar a experiência do usuário mais intuitiva e fácil de usar.",
  "permitir que o chatbot resolva problemas comuns e rotineiros de forma eficiente.",
  "possibilitar uma maior personalização de produtos e serviços com base no histórico de interações do usuário.",
];

const TypeEffect = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentIndex = index % phrases.length;
      const currentPhrase = phrases[currentIndex];

      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
      }

      if (text === currentPhrase && !isDeleting) {
        setIsDeleting(true);
        setTypingSpeed(50);
      } else if (text === "" && isDeleting) {
        setIsDeleting(false);
        setIndex(index + 1);
        setTypingSpeed(100);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [index, text, isDeleting, typingSpeed]);

  return (
    <Typography level="h3" className="TypeEffect">
      {" "}
      {text}
      <span className="cursor" />
    </Typography>
  );
};

export default TypeEffect;
