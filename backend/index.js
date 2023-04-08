const express = require("express");
const cors = require("cors");
const dialogflow = require("@google-cloud/dialogflow");
const bodyParser = require("body-parser");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-PGMzdrWC9mjOrphwpylzU6Vq",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());
app.use(bodyParser.json());

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// Your google dialogflow project-id
const PROJECID = CREDENTIALS.project_id;

// Configuration for the client
const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
};

// Create a new session
const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

// Detect intent method
const detectIntent = async (languageCode, queryText, sessionId) => {
  let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);

  // The text query request.
  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: queryText,
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  return {
    response: result.fulfillmentText,
  };
};

async function test() {
  const text = await detectIntent("pt-BR", "Me conta uma piada", "1");
  console.log(text);
}

test();

app.post("/chatgpt", async (req, res) => {
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

    res.json({ data: text });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ erro: "Ocorreu um erro ao processar a requisição." });
  }
});

app.post("/dialogflow", async (req, res) => {
  const languageCode = req.body.languageCode;
  const queryText = req.body.queryText;
  const sessionId = req.body.sessionId;

  const text = await detectIntent(languageCode, queryText, sessionId);

  console.log(text);

  res.json({ data: text });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}.`);
});
