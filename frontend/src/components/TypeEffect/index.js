import React, { useState, useEffect } from "react";
import { Typography } from "@mui/joy";
import "../../App.css";

const staticPhrase =
  "A Inteligência Artificial é a capacidade de uma máquina reproduzir a inteligência humana e";

const phrases = [
  "de executar tarefas e tomar decisões que, até então, só poderiam ser realizadas por seres humanos. Graças aos avanços em ciência e tecnologia, a inteligência artificial é capaz de analisar grandes quantidades de dados, reconhecer padrões complexos, aprender com suas próprias experiências e interagir com humanos de forma cada vez mais natural e intuitiva.",
  "de simular o pensamento, a percepção, a criatividade e a tomada de decisões dos seres humanos, utilizando algoritmos e modelos matemáticos sofisticados. A inteligência artificial é capaz de resolver problemas que antes pareciam impossíveis, como a detecção de fraudes em sistemas financeiros, a análise de imagens médicas para diagnóstico de doenças e a criação de sistemas de reconhecimento de voz e fala cada vez mais precisos.",
  "de ampliar as capacidades humanas, permitindo que sejam realizadas tarefas de forma mais rápida, precisa e eficiente do que seria possível de forma manual. A inteligência artificial é utilizada em diversas áreas, como a indústria, o comércio, a medicina, a educação e a segurança, e tem o potencial de transformar radicalmente a maneira como vivemos e trabalhamos.",
  "de criar sistemas que se adaptam ao ambiente e aprendem a partir de dados para tomar decisões, interpretar informações e realizar tarefas que antes eram exclusivas dos seres humanos. A inteligência artificial é capaz de analisar dados de diferentes fontes, identificar padrões e relações complexas, e criar modelos que ajudam a prever eventos futuros, melhorar a eficiência em processos produtivos e oferecer serviços personalizados aos usuários.",
  "de possibilitar a criação de máquinas que aprendem e evoluem com o tempo, de forma autônoma, sem a necessidade de intervenção humana. A inteligência artificial é capaz de se adaptar a novas situações, detectar problemas e encontrar soluções para desafios complexos, e pode ser aplicada em diversas áreas, como a robótica, a automação industrial, a logística e o transporte, para melhorar a segurança e a eficiência das operações.",
  "de transformar a maneira como interagimos com a tecnologia, tornando-a cada vez mais inteligente, intuitiva e acessível. A inteligência artificial é capaz de entender a linguagem natural, reconhecer gestos e expressões faciais, e criar interfaces que permitem uma interação mais natural e fluida entre humanos e máquinas.",
  "de ajudar a resolver alguns dos maiores desafios que a humanidade enfrenta, como a mudança climática, a escassez de recursos naturais e as desigualdades sociais. A inteligência artificial pode ser utilizada para otimizar processos produtivos, reduzir o consumo de energia e de matéria-prima, e criar soluções inovadoras para problemas sociais complexos.",
  "de gerar novas oportunidades de emprego e de negócios, à medida que novas aplicações e serviços baseados em inteligência artificial são criados. A inteligência artificial é um dos principais motores da chamada quarta revolução industrial, e tem o potencial de gerar novas formas de trabalho, novos modelos de negócios e novas fontes de renda para as pessoas em todo o mundo.",
  "de ser uma tecnologia que exige uma reflexão ética e social profunda, devido às implicações que tem para a privacidade, a segurança, a liberdade e a dignidade humana. A inteligência artificial deve ser desenvolvida de forma responsável, levando em conta os valores humanos e os interesses da sociedade como um todo, e não apenas os interesses econômicos ou tecnológicos de poucos.",
  "de ser uma tecnologia em constante evolução, que demanda um esforço contínuo de pesquisa, desenvolvimento e educação. A inteligência artificial é uma das áreas mais dinâmicas e promissoras da ciência e da tecnologia, e oferece um enorme potencial de impacto positivo para a humanidade, desde que seja desenvolvida de forma colaborativa, transparente e responsável.",
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
        setTypingSpeed(40);
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
