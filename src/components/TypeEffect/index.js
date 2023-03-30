import React, { useState, useEffect } from "react";
import { Typography } from "@mui/joy";
import "../../App.css";

const staticPhrase =
  "Inteligência Artificial, a capacidade de uma máquina reproduzir a inteligência humana e";

const phrases = [
  "tomar decisões complexas com base em dados e algoritmos.",
  "realizar tarefas de forma autônoma, sem intervenção humana.",
  "aprender continuamente, melhorando seu desempenho ao longo do tempo.",
  "analisar grandes quantidades de dados em tempo real.",
  "prever comportamentos e resultados futuros com precisão.",
  "criar novos conhecimentos a partir da análise de dados.",
  "detectar anomalias e padrões ocultos em grandes conjuntos de dados.",
  "se adaptar a diferentes situações e ambientes.",
  "se comunicar com seres humanos por meio de linguagem natural.",
  "reconhecer imagens e objetos em tempo real.",
  "identificar tendências e padrões em dados de mercado.",
  "personalizar experiências de usuário com base em dados de comportamento.",
  "desenvolver sistemas autônomos para tarefas específicas.",
  "melhorar a eficiência e reduzir os custos em vários setores.",
  "ser uma ferramenta poderosa para resolver problemas complexos.",
];

const TypeEffect = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [staticText, setStaticText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (staticText !== staticPhrase) {
        setStaticText(staticPhrase.substring(0, staticText.length + 1));
        return;
      }

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
  }, [index, text, isDeleting, typingSpeed, staticText]);

  return (
    <Typography level="h4" className="TypeEffect">
      {staticText} {staticText === staticPhrase && text}
      <span className="cursor" />
    </Typography>
  );
};

export default TypeEffect;
