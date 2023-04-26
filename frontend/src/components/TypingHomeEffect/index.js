import React, { useState, useEffect } from "react";
import { Typography } from "@mui/joy";
import "../../App.css";

const phrases = [
  "Com a ajuda da IA, os chatbots podem ser programados para entender e responder adequadamente a perguntas simples, tornando a interação com o usuário mais eficiente e amigável.",
  "A Inteligência Artificial permite que os chatbots compreendam e respondam de maneira apropriada a perguntas simples, o que melhora significativamente a interação com o usuário.",
  "Graças à tecnologia de Inteligência Artificial, os chatbots podem ser treinados para entender e responder de forma eficaz a perguntas simples, tornando a experiência do usuário mais amigável e interativa.",
  "Os chatbots programados com IA podem facilmente entender e responder perguntas simples, proporcionando uma interação mais fluida e agradável entre o usuário e o assistente virtual.",
  "Com o uso da Inteligência Artificial, os chatbots podem ser programados para responder corretamente a perguntas simples, melhorando a eficiência e a experiência do usuário na interação.",
  "Através da tecnologia de IA, os chatbots podem compreender e responder adequadamente a perguntas simples, proporcionando uma interação mais natural e eficiente para o usuário.",
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
        setTypingSpeed(40);
      } else if (text === "" && isDeleting) {
        setIsDeleting(false);
        setIndex(index + 1);
        setTypingSpeed(100);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [index, text, isDeleting, typingSpeed]);

  return (
    <Typography level="h5" sx={{ mt: 5, color: "#6a6a81" }}>
      {
        "A Inteligência Artificial pode ser utilizada para aprimorar e tornar mais natural as conversas entre pessoas e assistentes virtuais. "
      }
      {text}
      <span className="HomeCursor" />
    </Typography>
  );
};

export default TypeEffect;
