const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chatgptRouter = express.Router();

chatgptRouter.post("/chatgpt", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      temperature: 0.5,
      messages: [{ role: "user", content: message }],
    });

    const text = response.data.choices[0].message;

    console.log(text);

    return res.status(200).json({ data: text });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ erro: "Ocorreu um erro ao processar a requisição." });
  }
});

module.exports = chatgptRouter;
