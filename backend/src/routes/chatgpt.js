const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

if (!process.env.OPENAI_ORGANIZATION || !process.env.OPENAI_API_KEY)
  throw "Please, configure credentials in the env variables";

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const isAuth = require("../middleware/isAuth");
const chatgptRouter = express.Router();

chatgptRouter.post("/chatgpt", isAuth, async (req, res) => {
  const { queryText, context } = req.body;

  try {
    const chat = JSON.parse(context);

    const messages = [
      {
        role: "system",
        content:
          "Você é um assistente virtual que se chama ChatBox e responde todas as mensagens em português e foi desenvolvido por Natã",
      },
    ];

    chat.forEach((message) => {
      if (message.message !== undefined) {
        messages.push({
          role: message.isUser ? "user" : "assistant",
          content: message.message,
        });
      }
    });

    messages.push({
      role: "user",
      content: queryText,
    });

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 500,
      temperature: 0.5,
      messages: messages,
    });

    const message = response.data.choices[0].message;

    return res.status(200).json({ data: message });
  } catch (err) {
    return res
      .status(500)
      .json({ erro: "Ocorreu um erro ao processar a requisição." });
  }
});

module.exports = chatgptRouter;
