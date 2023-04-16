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
  const { queryText } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      temperature: 0.5,
      messages: [{ role: "user", content: queryText }],
    });

    const message = response.data.choices[0].message;

    return res.status(200).json({ data: message });
  } catch (err) {
    return res
      .status(500)
      .send({ erro: "Ocorreu um erro ao processar a requisição." });
  }
});

module.exports = chatgptRouter;
