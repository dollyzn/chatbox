import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Typography } from "@mui/joy";
import PropTypes from "prop-types";

import "../../App.css";

const TypingMessage = ({ message, typingSpeed, messageRef }) => {
  const [text, setText] = useState("");
  const [isAtLimit, setIsAtLimit] = useState(false);
  const [prevHeight, setprevHeight] = useState(null);

  const testRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setText(message.substring(0, text.length + 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [message, text, typingSpeed]);

  useLayoutEffect(() => {
    setIsAtLimit(
      messageRef.current.scrollTop + messageRef.current.clientHeight >=
        messageRef.current.scrollHeight - 60
    );

    const element = testRef.current;
    const rect = element.getBoundingClientRect();

    if (rect.height !== prevHeight) {
      if (isAtLimit) {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
      }
    }

    setprevHeight(rect.height);
    // eslint-disable-next-line
  }, [text]);

  return (
    <Typography ref={testRef} level="body1" sx={{ whiteSpace: "pre-line" }}>
      {text}
      <span className="MessageCursor" />
    </Typography>
  );
};

TypingMessage.propTypes = {
  message: PropTypes.string.isRequired,
  typingSpeed: PropTypes.number.isRequired,
  messageRef: PropTypes.any.isRequired,
};

export default TypingMessage;
