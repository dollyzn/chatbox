import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/joy";
import "../../App.css";

const TypingMessage = ({ message, typingSpeed }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setText(message.substring(0, text.length + 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [message, text, typingSpeed]);

  return (
    <Typography level="body1" sx={{ whiteSpace: "pre-line" }}>
      {text}
      <span className="MessageCursor" />
    </Typography>
  );
};

TypingMessage.propTypes = {
  message: PropTypes.string.isRequired,
  typingSpeed: PropTypes.number.isRequired,
};

export default TypingMessage;
